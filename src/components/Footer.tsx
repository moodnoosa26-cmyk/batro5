import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Heart, Shield } from 'lucide-react';
import { BatroukhLogo } from './BatroukhLogo';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onLogoClick?: () => void;
  logoClickCount?: number;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLogoClick, logoClickCount = 0, onOpenAdmin }) => {
  return (
    <footer className="bg-[#030712] border-t border-white/5 text-white/70 text-sm pb-24 lg:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <BatroukhLogo
                size="md"
                showSubtitle={true}
                onClick={onLogoClick}
                clickCount={logoClickCount}
              />
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-normal">
              أقوى مطعم سي فود مصري بطابع شبابي وجريء في الدقي والجيزة. طواجن الفسفور النارية، صواني الملوك المليانة جمبري وكابوريا، وساندوتشات الصاروخ الكرانشي مع خدمة دليفري 24 ساعة.
            </p>

            <div className="pt-2">
              <span className="text-xs text-white/50 block mb-2 font-bold">تابعنا على السوشيال ميديا:</span>
              <SocialLinks size="md" showLabels={false} />
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="text-white/70 hover:text-orange-400 transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#menu" className="text-white/70 hover:text-orange-400 transition-colors">منيو الصواريخ 🦐</a>
              </li>
              <li>
                <a href="#offers" className="text-white/70 hover:text-orange-400 transition-colors">العروض الحصرية 🔥</a>
              </li>
              <li>
                <a href="#calculator" className="text-white/70 hover:text-orange-400 transition-colors">حاسبة الفسفور ⚡</a>
              </li>
              <li>
                <a href="#reviews" className="text-white/70 hover:text-orange-400 transition-colors">آراء الأكيلة ⭐</a>
              </li>
              <li>
                <a href="#location" className="text-white/70 hover:text-orange-400 transition-colors">الفرع والخريطة 📍</a>
              </li>
            </ul>
          </div>

          {/* Local SEO Target Areas (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm">مناطق التوصيل السريع (الجيزة والقاهرة)</h4>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li>✓ مطعم مأكولات بحرية في الدقي (شارع مصدق / التحرير)</li>
              <li>✓ دليفري سمك وسيناري المهندسين وميدان لبنان</li>
              <li>✓ مطاعم سي فود العجوزة وكورنيش النيل</li>
              <li>✓ توصيل سي فود بين السرايات وجامعة القاهرة</li>
              <li>✓ أوردرات سمك طازج فيصل، الهرم، وميدان الجيزة</li>
              <li>✓ مطعم سمك شغال 24 ساعة دليفري فوري</li>
            </ul>
          </div>

          {/* Contact & Branch Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm">التواصل المباشر</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-white/70">شارع مصدق، متفرع من التحرير، الدقي، الجيزة.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:01023456789" className="text-white font-bold hover:text-orange-400 font-mono">
                  01023456789 (الخط الساخن)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-white/70">خدمة 24 ساعة يومياً (طوال الأسبوع)</span>
              </div>
            </div>

            {/* Secret Admin Button hint */}
            {onOpenAdmin && (
              <div className="pt-3">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1 text-[11px] text-white/30 hover:text-orange-400 transition-colors"
                >
                  <Shield className="w-3 h-3" />
                  <span>دخول الإدارة (أو اضغط اللوجو 5 مرات)</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Local SEO Tagline */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مطعم بطروخ للمأكولات البحرية - « بطروخ هيخليك صاروخ » 🚀
          </div>
          <div className="flex items-center gap-1">
            <span>صُنع بحب لأكيلة السي فود في الدقي ومصر</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
};
