import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Plus, Sparkles, Send } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/reviewsData';
import { Review } from '../types';
import confetti from 'canvas-confetti';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('الدقي');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [dishOrdered, setDishOrdered] = useState('طاجن بطروخ الملكي بالكريمة');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      authorName: authorName.trim(),
      location: location.trim(),
      rating,
      comment: comment.trim(),
      dishOrdered: dishOrdered.trim(),
      date: 'الآن',
      verifiedOrder: true,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + (reviews.length % 10)}?auto=format&fit=crop&w=150&q=80`,
    };

    setReviews([newRev, ...reviews]);
    setShowAddReview(false);
    setAuthorName('');
    setComment('');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#050A18] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs sm:text-sm font-medium">
              <Star className="w-4 h-4 text-orange-500 fill-current" />
              <span>تقييمات الأكيلة وعشاق الفسفور</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white">
              آراء زباين بطروخ في الدقي والجيزة ⭐
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-normal">
              أكثر من 15,000 عميل جربوا طعم الصاروخ والفسفور الحقيقي!
            </p>
          </div>

          {/* Social Proof Stats & Add Review Button */}
          <div className="flex items-center gap-4">
            <div className="text-center p-3.5 rounded-[24px] bg-[#0A1128]/90 border border-white/10 backdrop-blur-md">
              <div className="text-2xl font-bold text-orange-500">4.9 / 5.0</div>
              <div className="flex justify-center text-orange-400 text-xs mt-0.5">
                {'★★★★★'}
              </div>
            </div>

            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <Plus className="w-4 h-4 text-orange-400" />
              <span>اكتب رأيك وتجربتك</span>
            </button>
          </div>
        </div>

        {/* Add Review Form Collapse */}
        {showAddReview && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-10 p-6 sm:p-8 rounded-[32px] bg-[#0A1128]/90 backdrop-blur-md border border-orange-500/40 shadow-2xl space-y-4 animate-in fade-in"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              <span>شاركنا تقييمك لوجبة بطروخ:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">اسمك الكريم:</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="مثال: أحمد مصطفى"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">المنطقة (الدقي / المهندسين / الجيزة):</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">التقييم:</label>
                <div className="flex items-center gap-1.5 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-transform hover:scale-125 ${
                        star <= rating ? 'text-orange-500' : 'text-white/20'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-white/80 block mb-1">الصنف اللي طلبته:</label>
              <input
                type="text"
                value={dishOrdered}
                onChange={(e) => setDishOrdered(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white/80 block mb-1">رأيك بصراحة (السرعة، الطعم، التسوية):</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="اكتب تفاصيل تجربتك مع بطروخ..."
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddReview(false)}
                className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.35)]"
              >
                <Send className="w-4 h-4" />
                <span>نشر التقييم فوراً</span>
              </button>
            </div>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-[32px] bg-[#0A1128]/80 backdrop-blur-md border border-white/10 hover:border-orange-500/40 shadow-xl flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                {/* Author Info & Avatar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-orange-500/30 flex items-center justify-center text-sm font-bold text-orange-400">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.authorName}</h4>
                      <p className="text-[11px] text-white/50">{rev.location}</p>
                    </div>
                  </div>
                </div>

                {/* Stars Rating & Date */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex text-orange-400 text-xs">
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </div>
                  <span className="text-[11px] text-white/40">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Verified badge & dish */}
              {rev.dishOrdered && (
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-orange-400 font-bold truncate max-w-[170px]">
                    🦐 {rev.dishOrdered}
                  </span>
                  {rev.verifiedOrder && (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold shrink-0">
                      <CheckCircle className="w-3 h-3" />
                      <span>طلب موثق</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
