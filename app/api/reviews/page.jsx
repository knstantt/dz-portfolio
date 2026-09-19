import Shell from "@/components/Shell";
import ReviewForm from "@/components/ReviewForm";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getApprovedReviews() {
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();

  return (
    <Shell>
      <div className="max-w-2xl space-y-10">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Отзывы</h1>
          <p className="text-sm text-gray-500">Здесь вы можете почитать впечатления о сотрудничестве или оставить свой отзыв.</p>
        </div>

        {/* Список одобренных отзывов */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-400">Пока нет опубликованных отзывов.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  <span className="text-yellow-500 text-sm">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Форма добавления нового отзыва */}
        <div className="pt-6 border-t border-gray-100">
          <ReviewForm />
        </div>
      </div>
    </Shell>
  );
}