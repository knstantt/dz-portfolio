'use client';

import { useState } from 'react';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text, rating }),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      setName('');
      setText('');
      setRating(5);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Оставить отзыв</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Ваше имя</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Иван"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Оценка</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Текст отзыва</label>
        <textarea
          required
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ваш отзыв..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить отзыв'}
      </button>

      {status === 'success' && <p className="text-green-600 text-sm text-center">Спасибо! Отзыв отправлен на модерацию.</p>}
      {status === 'error' && <p className="text-red-600 text-sm text-center">Ошибка отправки. Попробуйте позже.</p>}
    </form>
  );
}