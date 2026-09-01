import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ShoppingBag, MessageCircle, Tag, Check, Copy } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/offersData';
import { Dish } from '../types';
import confetti from 'canvas-confetti';

interface OffersSectionProps {
  onAddOfferToCart: (offerDish: Dish) => void;
  onOpenCart: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  onAddOfferToCart,
  onOpenCart,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopiedCoupon(null), 3000);
  };

  const handleOrderOffer = (offer: typeof SPECIAL_OFFERS[0]) => {
    const offerDish: Dish = {
      id: offer.id,
      name: offer.title,
      category: 'trays',
      price: offer.price,
      originalPrice: offer.oldPrice,
      description: `${offer.subtitle} - ${offer.itemsIncluded.join(' + ')}`,
      image: offer.image,
      badge: offer.tag,
    };
    onAddOfferToCart(offerDish);
    onOpenCart();
  };

  const handleWhatsAppOffer = (offer: typeof SPECIAL_OFFERS[0]) => {
    const text = encodeURIComponent(
      `يا مطعم بطروخ! 🚀 عايز أطلب (${offer.title}) بسعر العرض الخاص ${offer.price} ج (بدلاً من ${offer.oldPrice} ج). كود الخصم: ${offer.couponCode || 'SAROOKH22'}. عنواني في الدقي/الجيزة.`
    );
    window.open(`https://wa.me/201023456789?text=${text}`, '_blank');
  };

  return (
    <section id="offers" className="py-16 sm:py-24 bg-[#050A18] relative overflow-hidden border-t border-white/5">
      {/* Immersive glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>عروض وتوفير بطروخ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white">
              عروض الصواريخ الحصرية 🔥
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-normal">
              وفر فلوسك واستمتع بأقوى صواني وطواجن الفسفور في الدقي بأعلى توفير!
            </p>
          </div>

          {/* Active Flash Deal Timer Badge */}
          <div className="p-4 rounded-2xl bg-[#0A1128]/90 border border-white/10 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs sm:text-sm">
              <Clock className="w-5 h-5 text-red-500 animate-pulse" />
              <span>ينتهي العرض بعد:</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-white text-base sm:text-lg font-bold" dir="ltr">
              <span className="px-3 py-1.5 bg-white/10 rounded-xl border border-white/10 text-orange-400">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-orange-500 font-bold">:</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-xl border border-white/10 text-orange-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-orange-500 font-bold">:</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-xl border border-white/10 text-red-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="rounded-[32px] bg-[#0A1128]/80 border border-white/10 hover:border-orange-500/50 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                {/* Visual */}
                <div className="relative aspect-video bg-[#070D1E] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-90" />
                  
                  {/* Tag */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-orange-600 text-white font-bold text-xs shadow-lg">
                    {offer.tag}
                  </span>

                  {/* Savings Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-black font-bold text-xs shadow-md">
                    وفر {offer.oldPrice - offer.price} ج.م
                  </div>
                </div>

                {/* Offer Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-orange-400 text-xs font-semibold mt-1">
                      {offer.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Included items checklist */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-white/50 block">المحتويات:</span>
                    {offer.itemsIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/80 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Pill */}
                  {offer.couponCode && (
                    <div className="pt-2 flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-dashed border-orange-500/40">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-500" />
                        <span className="text-xs text-white/70 font-medium">كود الخصم:</span>
                        <code className="text-xs font-mono font-bold text-orange-400">{offer.couponCode}</code>
                      </div>
                      <button
                        onClick={() => handleCopyCoupon(offer.couponCode!)}
                        className="px-3 py-1.5 rounded-full bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        {copiedCoupon === offer.couponCode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>تم النسخ!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>نسخ الكود</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                </div>
              </div>

              {/* Offer Footer */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-baseline justify-between pt-3 border-t border-white/10">
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-orange-500">{offer.price}</span>
                    <span className="text-xs text-orange-400 font-bold mr-1">ج.م</span>
                  </div>
                  <span className="text-sm text-white/40 line-through font-medium">{offer.oldPrice} ج.م</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleOrderOffer(offer)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-[0_0_15px_rgba(234,88,12,0.35)] transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>اطلب العرض الآن 🛒</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppOffer(offer)}
                    className="p-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 transition-all"
                    title="طلب العرض عبر واتساب"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
