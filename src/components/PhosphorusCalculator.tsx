import React, { useState } from 'react';
import { Zap, Users, Flame, Sparkles, Check, ShoppingBag, MessageCircle, RefreshCw } from 'lucide-react';
import { Dish } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface PhosphorusCalculatorProps {
  onAddDishToCart: (dish: Dish) => void;
  onOpenCart: () => void;
}

export const PhosphorusCalculator: React.FC<PhosphorusCalculatorProps> = ({
  onAddDishToCart,
  onOpenCart,
}) => {
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [mood, setMood] = useState<'rocket' | 'royal' | 'crunchy' | 'spicy'>('rocket');
  const [prefType, setPrefType] = useState<'tajines' | 'sandwiches' | 'platters'>('tajines');
  const [calculated, setCalculated] = useState<boolean>(false);

  // Recommendations Logic
  const getRecommendation = () => {
    if (peopleCount >= 4) {
      const platter = MENU_ITEMS.find((d) => d.id === 'platter-sarookh-el-fosfor') || MENU_ITEMS[0];
      return {
        dish: platter,
        quote: 'وليمة صينية صاروخ الفسفور الملكية هتخلي الشلة كلها طايرة في سابع سما! 🚀👑',
        phosphorusScore: '99% فسفور نووي ⚡',
        tip: 'معاها 4 شوربات سي فود وأرز صيادية وطاجن بطروخ كريمة!',
      };
    } else if (peopleCount === 2 || peopleCount === 3) {
      if (mood === 'crunchy') {
        const dish = MENU_ITEMS.find((d) => d.id === 'platter-kings-giza') || MENU_ITEMS[0];
        return {
          dish,
          quote: 'صينية ملوك الدقي والجيزة - قرمشة وفسفور مظبوط بالملي لصحاب العمر! 🦐',
          phosphorusScore: '95% فسفور صافي ⚡',
          tip: 'قاروص سنجاري + نص كيلو جمبري كرسبي مقلي + شوربات وسلطات!',
        };
      } else {
        const dish = MENU_ITEMS.find((d) => d.id === 'tajine-batroukh-supreme') || MENU_ITEMS[0];
        return {
          dish,
          quote: 'طاجن بطروخ الملكي بالكريمة والبطارخ - الميكس السري اللي هيبهرك! 🍲',
          phosphorusScore: '98% فسفور ملكي ⚡',
          tip: 'اطلب معاه ساندوتشين صاروخ وشوربة سي فود عشان تكتمل الخطة!',
        };
      }
    } else {
      // 1 person
      if (prefType === 'sandwiches') {
        const dish = MENU_ITEMS.find((d) => d.id === 'sandwich-rocket-supreme') || MENU_ITEMS[3];
        return {
          dish,
          quote: 'ساندوتش صاروخ بطروخ العملاق - ساندوتش يسد جوعك ويشحن طاقتك 100%! 🚀',
          phosphorusScore: '92% طاقة فورية ⚡',
          tip: 'خد معاه ليمون نعناع فريش عشان تهدي الصاروخ شوية!',
        };
      } else {
        const dish = MENU_ITEMS.find((d) => d.id === 'tajine-batroukh-supreme') || MENU_ITEMS[0];
        return {
          dish,
          quote: 'طاجن بطروخ الملكي الفردي بالكريمة والجبنة السايحة - تعديل مزاج سريع! 🔥',
          phosphorusScore: '96% فسفور عالي التركيز ⚡',
          tip: 'متنساش تعصر الليمونة مع الشبت وصوص الكريمة!',
        };
      }
    }
  };

  const rec = getRecommendation();

  const handleOrderRecommendation = () => {
    onAddDishToCart(rec.dish);
    onOpenCart();
  };

  const handleWhatsAppRec = () => {
    const text = encodeURIComponent(
      `يا بطروخ! 🚀 حسبت جرعة الفسفور في الموقع وطلعت لي الوجبة المثالية: (${rec.dish.name} - سعرها ${rec.dish.price} ج). عايز أطلبها دليفري للدقي/الجيزة دلوقتي! 🔥`
    );
    window.open(`https://wa.me/201012560054?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-[#050A18] border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs sm:text-sm font-medium">
            <Zap className="w-4 h-4 text-orange-500 fill-current" />
            <span>حاسبة بطروخ الذكية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white">
            احسب جرعة الفسفور بتاعتك ⚡
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-normal">
            محتار تاكل ايه النهاردة؟ حدد عدد الأكيلة ومزاجك وبطروخ هيطلع لك أحسن كومبو يظبط دماغك ويسد جوعك!
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="bg-[#0A1128]/80 backdrop-blur-md rounded-[32px] border border-white/10 p-5 sm:p-8 shadow-2xl space-y-8">
          
          {/* Step 1: People Count */}
          <div className="space-y-3">
            <label className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span>1. عدد الأكيلة (كام واحد هياكل؟):</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {[
                { count: 1, label: 'سهران لوحدي 👤', desc: 'وجبة فردية مشبعة' },
                { count: 2, label: 'أنا وصاحبي / 2 أكيلة 👥', desc: 'دبل فسفور' },
                { count: 4, label: 'شلة / عيلة (4-6 أفراد) 👨‍👩‍👧‍👦', desc: 'صواني اللمة' },
              ].map((item) => (
                <button
                  key={item.count}
                  onClick={() => {
                    setPeopleCount(item.count);
                    setCalculated(true);
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-right transition-all ${
                    peopleCount === item.count
                      ? 'bg-orange-600/20 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm sm:text-base text-white">{item.label}</div>
                  <div className="text-xs text-white/50 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Mood & Goal */}
          <div className="space-y-3">
            <label className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span>2. ايه مودك دلوقتي؟:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {[
                { id: 'rocket', label: 'عايز أطير للفضاء 🚀', sub: 'أقصى طاقة وبطارخ' },
                { id: 'royal', label: 'عشا ملوكي رايق 👑', sub: 'دنيس وقاروص فاخر' },
                { id: 'crunchy', label: 'توفير وقرمشة 🦐', sub: 'جمبري كرسبي وساندوتشات' },
                { id: 'spicy', label: 'سبايسي نار حارق 🌶️', sub: 'خلطة إسكندراني حامية' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMood(item.id as any);
                    setCalculated(true);
                  }}
                  className={`p-3 rounded-2xl border text-right transition-all ${
                    mood === item.id
                      ? 'bg-orange-600/20 border-orange-500 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-white">{item.label}</div>
                  <div className="text-[11px] text-white/50 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Result Output Box */}
          <div className="mt-6 p-5 sm:p-6 rounded-[28px] bg-[#070D1E] border border-orange-500/30 relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-sm sm:text-base">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span>نتيجة تحليل بطروخ لطلبك المثالي:</span>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                {rec.phosphorusScore}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-4">
              
              {/* Dish Visual */}
              <div className="md:col-span-4">
                <div className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-square bg-[#050A18] border border-white/10">
                  <img
                    src={rec.dish.image}
                    alt={rec.dish.name}
                    className="w-full h-full object-cover"
                  />
                  {rec.dish.badge && (
                    <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-orange-600 text-white text-xs font-bold shadow">
                      {rec.dish.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Recommendation Details */}
              <div className="md:col-span-8 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{rec.dish.name}</h3>
                    <p className="text-orange-400 text-xs sm:text-sm font-semibold mt-1">"{rec.quote}"</p>
                  </div>
                  <div className="text-left">
                    <span className="text-xl sm:text-2xl font-bold text-orange-500">{rec.dish.price} ج</span>
                    {rec.dish.originalPrice && (
                      <span className="text-xs text-white/40 line-through block">{rec.dish.originalPrice} ج</span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {rec.dish.description}
                </p>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70">
                  💡 <span className="text-white font-bold">نصيحة بطروخ:</span> {rec.tip}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleOrderRecommendation}
                    className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-[0_0_15px_rgba(234,88,12,0.35)] transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>أضف للطلب فوراً 🛒</span>
                  </button>

                  <button
                    onClick={handleWhatsAppRec}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>طلب سريع واتساب</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
