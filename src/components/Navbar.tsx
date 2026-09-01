import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, Menu as MenuIcon, X, MapPin, Clock, Bike, Volume2, Shield } from 'lucide-react';
import { CartItem, ActiveOrder, StoreSettings } from '../types';
import { BatroukhLogo } from './BatroukhLogo';
import { SocialLinks } from './SocialLinks';
import { playBatroukhAudio } from './IntroAudioSplash';

interface NavbarProps {
  cartItems: CartItem[];
  activeOrder?: ActiveOrder | null;
  onOpenCart: () => void;
  onOpenOrderStatus?: () => void;
  onLogoClick: () => void;
  logoClickCount: number;
  onOpenAdmin: () => void;
  storeSettings?: StoreSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  activeOrder,
  onOpenCart,
  onOpenOrderStatus,
  onLogoClick,
  logoClickCount,
  onOpenAdmin,
  storeSettings,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'المنيو والصواريخ 🦐', href: '#menu' },
    { name: 'صواني الملوك 👑', href: '#menu' },
    { name: 'العروض الحصرية 🔥', href: '#offers' },
    { name: 'حاسبة الفسفور ⚡', href: '#calculator' },
    { name: 'آراء الأكيلة ⭐', href: '#reviews' },
    { name: 'الفرع والخريطة 📍', href: '#location' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050A18]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-2'
          : 'bg-[#050A18]/90 backdrop-blur-md border-b border-white/10 py-3'
      }`}
    >
      {/* Top micro bar for 24h & Dokki badge & Social Media */}
      <div className="hidden md:block bg-[#030712]/95 border-b border-white/5 py-1 text-xs text-white/70">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-white/80">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              فرع الدقي: شارع مصدق - متفرع من التحرير
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              مفتوح الآن 24 ساعة (دليفري وصالة)
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50">تابعنا:</span>
              <SocialLinks size="sm" />
            </div>

            <span className="text-white/20">|</span>

            {/* Comedic Voice Replay Button */}
            <button
              onClick={() => playBatroukhAudio()}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-bold text-[11px] transition-colors"
              title="اسمع شعار بطروخ بصوت مصري كوميدي!"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>بطروخ هيخليك صاروخ 🔊</span>
            </button>

            <span className="text-white/20">|</span>

            <a
              id="topbar-call-link"
              href={`tel:${storeSettings?.hotline || '01023456789'}`}
              className="text-white/90 hover:text-orange-400 font-bold transition-colors font-mono"
            >
              الخط الساخن: {storeSettings?.hotline || '01023456789'} 📞
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Slogan with Secret 5-Click Admin Trigger */}
          <div className="flex items-center gap-2">
            <BatroukhLogo
              size={isScrolled ? 'sm' : 'md'}
              showSubtitle={true}
              onClick={onLogoClick}
              clickCount={logoClickCount}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.href + idx}
                id={`desktop-nav-${idx}`}
                href={link.href}
                className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-medium transition-all ${
                  idx === 0
                    ? 'text-orange-500 bg-orange-600/10'
                    : 'text-white/80 hover:text-orange-400 hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Cart & Audio & Call & Tracking */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Audio Button for Mobile/Tablet */}
            <button
              onClick={() => playBatroukhAudio()}
              className="p-2 rounded-full bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30 transition-all md:hidden"
              title="اسمع الشعار 🚀"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Live Order Tracking Button (if active order exists) */}
            {activeOrder && onOpenOrderStatus && (
              <button
                id="nav-order-tracking-btn"
                onClick={onOpenOrderStatus}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse"
                title="متابعة حالة طلبك المباشرة"
              >
                <Bike className="w-4 h-4 text-emerald-400" />
                <span>تتبع الأوردر #{activeOrder.orderNumber}</span>
              </button>
            )}

            {/* Quick Call Button */}
            <a
              id="nav-direct-call-btn"
              href={`tel:${storeSettings?.hotline || '01023456789'}`}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs sm:text-sm font-medium transition-all shadow-sm font-mono"
              title="اتصل بالفرع مباشرة"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>{storeSettings?.hotline || '01023456789'}</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              id="nav-open-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm transition-all transform active:scale-95 shadow-[0_0_15px_rgba(234,88,12,0.4)]"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden xs:inline">الطلب والسلة</span>
              {totalItemsCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-xs font-black shadow animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-dropdown-menu"
            className="lg:hidden mt-3 p-4 rounded-3xl bg-[#050A18]/98 border border-white/10 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-white/80 hover:text-orange-400 hover:bg-white/5 font-medium transition-all text-sm"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-3">
              {/* Social Links on Mobile */}
              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-white/60 font-bold">صفحات بطروخ الرسمية:</span>
                <SocialLinks size="sm" />
              </div>

              {/* Audio button */}
              <button
                onClick={() => {
                  playBatroukhAudio();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 font-bold text-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسمع صوت وشعار بطروخ 🔊</span>
              </button>

              <a
                href={`tel:${storeSettings?.hotline || '01023456789'}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/10 text-white font-bold text-sm font-mono"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>اتصال بالفرع: {storeSettings?.hotline || '01023456789'}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
