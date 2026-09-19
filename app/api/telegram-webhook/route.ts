import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.callback_query) {
      return NextResponse.json({ ok: true });
    }

    const callbackQuery = body.callback_query;
    const data = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    const [action, reviewId] = data.split('_');
    if (!action || !reviewId) return NextResponse.json({ ok: true });

    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const actionText = action === 'approve' ? '✅ Опубликовано' : '❌ Отклонено';

    await supabase.from('reviews').update({ status: newStatus }).eq('id', reviewId);

    if (botToken) {
      const originalText = callbackQuery.message.text;
      await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: `${originalText}\n\n*Статус:* ${actionText}`,
          parse_mode: 'Markdown',
        }),
      });

      await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQuery.id, text: `Отзыв ${action === 'approve' ? 'опубликован' : 'отклонен'}!` }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}