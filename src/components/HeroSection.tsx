import React from 'react';
import { MessageCircle, Phone, Sparkles, Flame, Clock, Star, MapPin, ArrowDown, ShieldCheck, Zap } from 'lucide-react';
import heroImg from '../assets/images/batroukh_hero_seafood_1788219274003.jpg';

interface HeroSectionProps {
  onOpenCart: () => void;
  onExploreMenu: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCart,
  onExploreMenu,
  onOpenCalculator,
}) => {
  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      'يا هلا بملوك السي فود! 🦐 عايز أطلب أوردر صاروخ من مطعم بطروخ في الدقي. ايه العروض المميزة المتاحة دلوقتي؟ 🔥'
    );
    window.open(`https://wa.me/201012560054?text=${text}`, '_blank');
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-[#050A18]"
    >
      {/* Background Ambience & Immersive Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Right Column: Catchy Text & Hero CTAs */}
          <div className="lg:col-span-7 text-center lg:text-right space-y-6 sm:space-y-7">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-400 text-xs sm:text-sm font-medium shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white/90">مفتوح 24 ساعة دليفري وصالة في الدقي والجيزة</span>
              <span className="text-orange-500 font-bold">24/7 🔥</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold font-heading tracking-tight text-white leading-[1.2]">
                <span className="block text-white/90">أقوى مأكولات بحرية في مصر</span>
                <span className="text-orange-500 filter drop-shadow-[0_0_25px_rgba(234,88,12,0.35)]">
                  بطروخ هيخليك صاروخ!
                </span>
                <span className="inline-block text-3xl sm:text-5xl mr-2 animate-rocket">🚀</span>
              </h1>
              
              <p className="text-white/70 text-base sm:text-lg sm:leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                جرعات الفسفور الصافية مع طواجن الكريمة النارية، ساندوتشات الصاروخ العملاقة، وصواني اللمة اللي تشرف في أي عزومة. صيد طازة يومياً، تتبيلة إسكندراني أصلية، وتوصيل طيارة لحد باب بيتك!
              </p>
            </div>

            {/* Quick USP Highlights */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-xl mx-auto lg:mx-0 pt-1">
              <div className="p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-white/20 transition-colors">
                <div className="text-orange-500 font-bold text-base sm:text-xl">40 دقيقة</div>
                <div className="text-white/60 text-xs font-medium mt-0.5">أسرع دليفري 🛵</div>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-white/20 transition-colors">
                <div className="text-orange-500 font-bold text-base sm:text-xl">طازة 100%</div>
                <div className="text-white/60 text-xs font-medium mt-0.5">صيد البحر يومياً 🐟</div>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-white/20 transition-colors">
                <div className="text-orange-500 font-bold text-base sm:text-xl">4.9 / 5 ⭐</div>
                <div className="text-white/60 text-xs font-medium mt-0.5">+15K عميل شبعان 😋</div>
              </div>
            </div>

            {/* High-Impact Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {/* WhatsApp Main CTA */}
              <button
                id="hero-whatsapp-order-btn"
                onClick={handleDirectWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all transform active:scale-95 animate-pulse-glow"
              >
                <MessageCircle className="w-5 h-5 text-black fill-current" />
                <span>اطلب سريع عبر WhatsApp 💬</span>
              </button>

              {/* Browse Menu Button */}
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all transform active:scale-95"
              >
                <Flame className="w-5 h-5" />
                <span>منيو الفسفور والصواريخ 📜</span>
              </button>

              {/* Fun Phosphorus Quiz CTA */}
              <button
                id="hero-phosphorus-calc-btn"
                onClick={onOpenCalculator}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-sm transition-all"
                title="احسب وجبتك المناسبة ومزاجك"
              >
                <Zap className="w-4 h-4 text-orange-500 fill-current" />
                <span>احسب جرعتك ⚡</span>
              </button>
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-white/60 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ضمان النظافة والجودة الإسكندرانية
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                تغطية الدقي، المهندسين، العجوزة والجيزة
              </span>
            </div>

          </div>

          {/* Left Column: Visual Feast Imagery & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glow Backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 rounded-[34px] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>

              {/* Main Visual Image Card */}
              <div className="relative rounded-[32px] overflow-hidden bg-[#0A1128] border border-white/10 shadow-2xl">
                <img
                  src={heroImg}
                  alt="وليمة بطروخ للمأكولات البحرية في الدقي"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A18] via-transparent to-transparent opacity-90" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-[#0A1128]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-orange-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-500 fill-current" />
                      صينية "صاروخ الفسفور" الملكية
                    </div>
                    <div className="text-sm font-bold text-white">دنيس + جمبري + سبيط + طاجن بطروخ</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-white/40 block">1200 ج</span>
                    <span className="text-base font-bold text-emerald-400">990 ج</span>
                  </div>
                </div>
              </div>

              {/* Floating Comic Badge 1 */}
              <div className="absolute -top-3 -right-3 bg-orange-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-xl border border-white/20 rotate-6 flex items-center gap-1.5">
                <span>🔥 فسفور 100%</span>
              </div>

              {/* Floating Comic Badge 2 */}
              <div className="absolute -bottom-3 -left-3 bg-[#0A1128] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-xl border border-white/20 -rotate-6 flex items-center gap-1.5">
                <span className="text-orange-500">⚡</span>
                <span>بطروخ يعدل مزاجك</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
