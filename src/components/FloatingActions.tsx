import React from 'react';
import { MessageCircle, Phone, ShoppingBag, Utensils, Bike } from 'lucide-react';
import { CartItem, ActiveOrder } from '../types';

interface FloatingActionsProps {
  cartItems: CartItem[];
  activeOrder?: ActiveOrder | null;
  onOpenCart: () => void;
  onOpenOrderStatus?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  cartItems,
  activeOrder,
  onOpenCart,
  onOpenOrderStatus,
}) => {
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      'يا هلا بملوك السي فود! 🦐 عايز أطلب أوردر صاروخ من مطعم بطروخ في الدقي. ايه العروض المميزة المتاحة دلوقتي؟ 🔥'
    );
    window.open(`https://wa.me/201023456789?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Desktop Floating Actions (Bottom-Left) */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-40 flex-col gap-3">
        {/* Floating Order Status (if active order exists) */}
        {activeOrder && onOpenOrderStatus && (
          <button
            id="floating-order-status-btn"
            onClick={onOpenOrderStatus}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold text-sm backdrop-blur-md shadow-2xl transition-all hover:scale-105 animate-pulse"
            title="متابعة حالة الطلب Live"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Bike className="w-4 h-4" />
            </div>
            <span>تتبع الأوردر #{activeOrder.orderNumber} 🛵</span>
          </button>
        )}

        {/* Floating Call Button */}
        <a
          id="floating-call-btn-desktop"
          href="tel:01023456789"
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0A1128]/90 hover:bg-[#0A1128] text-white font-bold text-sm border border-white/10 backdrop-blur-md shadow-2xl transition-all hover:scale-105"
          title="اتصل بالخط الساخن: 01023456789"
        >
          <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-400">
            <Phone className="w-4 h-4 text-orange-500" />
          </div>
          <span>01023456789</span>
        </a>

        {/* Floating WhatsApp Button */}
        <button
          id="floating-whatsapp-btn-desktop"
          onClick={handleDirectWhatsApp}
          className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all hover:scale-105 animate-pulse-glow"
        >
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 fill-current text-black" />
          </div>
          <span>اطلب سريع ع الواتساب 💬</span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-[#050A18]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.7)]">
        {/* If active order exists on mobile, display small top alert ticker */}
        {activeOrder && onOpenOrderStatus && (
          <div className="mb-2 -mt-1">
            <button
              onClick={onOpenOrderStatus}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow animate-pulse"
            >
              <div className="flex items-center gap-2">
                <Bike className="w-3.5 h-3.5 text-emerald-400" />
                <span>أوردرك #{activeOrder.orderNumber} قيد المتابعة Live</span>
              </div>
              <span className="text-[10px] text-emerald-400 underline font-bold">عرض الحالة 👈</span>
            </button>
          </div>
        )}

        <div className="max-w-md mx-auto grid grid-cols-4 gap-2">
          
          {/* 1. Quick Call */}
          <a
            id="mobile-sticky-call-btn"
            href="tel:01023456789"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white/5 border border-white/10 text-white/80 active:bg-white/10"
          >
            <Phone className="w-4 h-4 text-orange-500 mb-0.5" />
            <span className="text-[10px] font-bold">اتصال</span>
          </a>

          {/* 2. Menu Quick Link */}
          <a
            id="mobile-sticky-menu-btn"
            href="#menu"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white/5 border border-white/10 text-white/80 active:bg-white/10"
          >
            <Utensils className="w-4 h-4 text-orange-400 mb-0.5" />
            <span className="text-[10px] font-bold">المنيو</span>
          </a>

          {/* 3. Cart Button with Counter */}
          <button
            id="mobile-sticky-cart-btn"
            onClick={onOpenCart}
            className="relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white/5 border border-white/10 text-white/80 active:bg-white/10"
          >
            <ShoppingBag className="w-4 h-4 text-orange-400 mb-0.5" />
            <span className="text-[10px] font-bold">السلة</span>
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#050A18] animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* 4. WhatsApp CTA (Dominant) */}
          <button
            id="mobile-sticky-whatsapp-btn"
            onClick={handleDirectWhatsApp}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-[#25D366] text-black font-bold active:bg-[#20bd5a] animate-pulse-glow shadow-[0_0_15px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
            <span className="text-[10px] font-bold">واتساب 🚀</span>
          </button>

        </div>
      </div>
    </>
  );
};
