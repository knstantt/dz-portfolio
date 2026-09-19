import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, text, rating } = await request.json();

    if (!name || !text) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([{ name, text, rating: rating || 5, status: 'pending' }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Ошибка сохранения' }, { status: 500 });
    }

    const reviewId = data.id;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = `💬 *Новый отзыв на модерацию!*\n\n👤 *Имя:* ${name}\n⭐ *Оценка:* ${rating || 5}/5\n📝 *Текст:* ${text}`;

      const keyboard = {
        inline_keyboard: [
          [
            { text: '✅ Опубликовать', callback_data: `approve_${reviewId}` },
            { text: '❌ Отклонить', callback_data: `reject_${reviewId}` },
          ],
        ],
      };

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
          reply_markup: keyboard,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}