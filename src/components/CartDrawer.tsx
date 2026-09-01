import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  MessageCircle, 
  Tag, 
  MapPin, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Bike, 
  Store, 
  UtensilsCrossed,
  Calendar,
  Clock
} from 'lucide-react';
import { CartItem, ActiveOrder } from '../types';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOrderPlaced?: (order: ActiveOrder) => void;
}

const SCHEDULED_TIME_SLOTS = [
  'توصيل فوري (الآن - خلال 30-45 دقيقة)',
  'اليوم: 05:00 م - 06:00 م (وجبة العصر)',
  'اليوم: 06:00 م - 07:00 م (وجبة أول الليل)',
  'اليوم: 07:00 م - 08:00 م (وقت العشاء الرئيسي)',
  'اليوم: 08:00 م - 09:00 م (عشاء عائلي)',
  'اليوم: 09:00 م - 10:00 م',
  'اليوم: 10:00 م - 11:00 م (فسفور سهرة)',
  'اليوم: 11:00 م - 12:00 منتصف الليل',
  'اليوم: 12:00 ص - 01:00 ص (سهرة متأخرة 24h)',
  'غداً: 01:00 م - 02:00 م (وقت الغداء)',
  'غداً: 02:00 م - 03:00 م',
  'غداً: 06:00 م - 07:00 م (عزومة عشاء)',
  'غداً: 08:00 م - 09:00 م (عشاء فاخر)',
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState<string>(SCHEDULED_TIME_SLOTS[1]); // Default scheduled slot
  const [orderNotes, setOrderNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponSuccessMsg, setCouponSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculation
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 600 ? 0 : 25) : 0;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const netTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SAROOKH22') {
      setAppliedDiscount(22);
      setCouponSuccessMsg('تم تطبيق خصم الصاروخ 22%! 🔥');
    } else if (code === 'MALIK100') {
      setAppliedDiscount(15);
      setCouponSuccessMsg('تم تطبيق خصم ملوك البحر 15%! 👑');
    } else if (code === 'BATROUKH10' || code === 'NIGHT24') {
      setAppliedDiscount(10);
      setCouponSuccessMsg('تم تطبيق كود الخصم 10%! 🎉');
    } else {
      setCouponSuccessMsg('كود الخصم غير صحيح، جرب SAROOKH22 أو BATROUKH10');
      setAppliedDiscount(0);
      return;
    }

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleSendOrderWhatsApp = () => {
    if (cartItems.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('من فضلك اكتب الاسم ورقم الموبايل لاستكمال الطلب.');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      alert('من فضلك اكتب عنوان التوصيل بالتفصيل في الدقي أو الجيزة.');
      return;
    }

    // Build Formatted Arabic Message for WhatsApp
    const orderTypeLabel =
      orderType === 'delivery'
        ? '🛵 دليفري وتوصيل للمنزل'
        : orderType === 'takeaway'
        ? '⚓ استلام تيك أواي من فرع الدقي'
        : '🍽️ حجز وتناول في صالة المطعم';

    const itemsSummary = cartItems
      .map((item, idx) => {
        let text = `${idx + 1}. *${item.dish.name}* × ${item.quantity} = ${item.totalPrice} ج.م`;
        if (item.selectedCookingOption) {
          text += `\n   - طريقة التسوية: ${item.selectedCookingOption.nameAr}`;
        }
        if (item.specialInstructions) {
          text += `\n   - ملاحظة: ${item.specialInstructions}`;
        }
        return text;
      })
      .join('\n\n');

    const fullMessage = `*🔥 أوردر جديد من موقع مطعم بطروخ للمأكولات البحرية 🚀*
---------------------------------------
*👤 العميل:* ${customerName.trim()}
*📞 التليفون:* ${customerPhone.trim()}
*📍 نوع الطلب:* ${orderTypeLabel}
*⏰ موعد التوصيل المجدول:* ${scheduledTimeSlot}
${orderType === 'delivery' ? `*🏠 عنوان التوصيل:* ${deliveryAddress.trim()}` : ''}
${orderNotes.trim() ? `*📝 ملاحظات عامة:* ${orderNotes.trim()}` : ''}

*📋 تفاصيل الأصناف والوجبات:*
${itemsSummary}

---------------------------------------
*💰 إجمالي الحساب:*
- المجموع الفرعي: ${subtotal} ج.م
${appliedDiscount > 0 ? `- الخصم (${appliedDiscount}%): -${discountAmount} ج.م (كود: ${couponCode.toUpperCase()})\n` : ''}${orderType === 'delivery' ? `- خدمة التوصيل: ${deliveryFee === 0 ? 'مجاناً (عرض الطلبات فوق 600ج)' : `${deliveryFee} ج.م`}\n` : ''}*🔥 الصافي المطلوب للدفع: ${netTotal} ج.م*

_بطروخ هيخليك صاروخ! برجاء تأكيد الطلب والموعد المجدول._`;

    const encoded = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/201023456789?text=${encoded}`;

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
    });

    const newOrder: ActiveOrder = {
      id: Date.now().toString(),
      orderNumber: Math.floor(1000 + Math.random() * 9000).toString(),
      createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      orderType,
      deliveryAddress: deliveryAddress.trim(),
      scheduledTimeSlot,
      orderNotes: orderNotes.trim(),
      items: [...cartItems],
      subtotal,
      discountAmount,
      deliveryFee,
      netTotal,
      couponCode: couponCode.trim() || undefined,
      currentStage: 'received',
      stageUpdatedAt: Date.now(),
      estimatedMinutesLeft: 35,
    };

    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#050A18]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="relative w-screen max-w-md bg-[#0A1128] border-r border-white/10 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-[#050A18] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-orange-600/20 text-orange-400">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold font-heading text-lg text-white">سلة الطلبات</h3>
                <p className="text-xs text-white/60">
                  {cartItems.length} {cartItems.length === 1 ? 'صنف مختار' : 'أصناف مختارة'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-3xl">
                  🦐
                </div>
                <h4 className="text-lg font-bold text-white">سلتك فاضية لسه!</h4>
                <p className="text-xs text-white/60 max-w-xs mx-auto">
                  تصفح منيو الصواريخ والطواجن واختر وجبة الفسفور اللي تظبط دماغك.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(234,88,12,0.35)]"
                >
                  تصفح المنيو الآن
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white/60">
                    <span>الأصناف المطلوبة:</span>
                    <button
                      onClick={onClearCart}
                      className="text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>مسح الكل</span>
                    </button>
                  </div>

                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex gap-3 items-start"
                    >
                      {/* Image */}
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                            {item.dish.name}
                          </h5>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-white/40 hover:text-red-400 p-0.5 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedCookingOption && (
                          <div className="text-[11px] text-orange-400 font-medium truncate">
                            🍲 {item.selectedCookingOption.nameAr}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <div className="text-[10px] text-white/50 italic truncate">
                            📝 {item.specialInstructions}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-orange-500">
                            {item.totalPrice} ج.م
                          </span>

                          {/* Qty controls */}
                          <div className="flex items-center bg-[#070D1E] rounded-full border border-white/10">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Delivery Type Switcher */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-bold text-white/80 block">طريقة الاستلام:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'delivery', label: 'دليفري 🛵', icon: Bike },
                      { id: 'takeaway', label: 'تيك أواي ⚓', icon: Store },
                      { id: 'dinein', label: 'بالصالة 🍽️', icon: UtensilsCrossed },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setOrderType(type.id as any)}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          orderType === type.id
                            ? 'bg-orange-600/20 border-orange-500 text-orange-400 font-bold'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-bold block">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-white/70 block mb-1">
                      الاسم بالكامل: <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: كريم يوسف"
                      className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-white/70 block mb-1">
                      رقم الهاتف / الواتساب: <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="010xxxxxxxx"
                      className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Scheduled Delivery Time Slot Dropdown */}
                  <div>
                    <label className="text-[11px] font-bold text-white/80 flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                        <span>موعد التوصيل المجدول (Scheduled Slot):</span>
                      </span>
                      <span className="text-[10px] text-orange-400 font-bold">تحديد موعد الاستلام ⏰</span>
                    </label>
                    <div className="relative">
                      <select
                        value={scheduledTimeSlot}
                        onChange={(e) => setScheduledTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[#070D1E] border border-white/15 text-white text-xs focus:outline-none focus:border-orange-500 appearance-none font-medium cursor-pointer shadow-inner pr-3 pl-8"
                      >
                        {SCHEDULED_TIME_SLOTS.map((slot, index) => (
                          <option key={index} value={slot} className="bg-[#0A1128] text-white py-1">
                            {slot}
                          </option>
                        ))}
                      </select>
                      <Clock className="w-4 h-4 text-orange-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <p className="text-[10px] text-white/50 mt-1">
                      💡 يمكنك جدولة طلبك مسبقاً للعشاء أو العزومات لتجهيز الطواجن طازجة في نفس الموعد.
                    </p>
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-[11px] font-bold text-white/70 block mb-1">
                        عنوان التوصيل (الدقي / المهندسين / الجيزة): <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="الشارع، رقم العمارة، الدور، الشقة، علامة مميزة..."
                        className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-bold text-white/70 block mb-1">
                      ملاحظات على الطلب (اختياري):
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="مواعيد خاصة، رن الجرس، بدون شطة..."
                      className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Coupon Code Box */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="كوبون الخصم (SAROOKH22)"
                      className="flex-1 px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-orange-400 text-xs font-bold transition-colors"
                    >
                      تطبيق
                    </button>
                  </div>
                  {couponSuccessMsg && (
                    <div className="text-[11px] text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{couponSuccessMsg}</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-white/70">
                    <span>مجموع الأصناف:</span>
                    <span>{subtotal} ج.م</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>خصم الكوبون ({appliedDiscount}%):</span>
                      <span>-{discountAmount} ج.م</span>
                    </div>
                  )}

                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-white/70">
                      <span>خدمة التوصيل:</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-400 font-bold">مجاناً (توصيل مميز)</span>
                        ) : (
                          `${deliveryFee} ج.م`
                        )}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                    <span>الإجمالي النهائي:</span>
                    <span className="text-orange-500 text-base font-bold">{netTotal} ج.م</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Drawer Footer CTA */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-[#050A18] border-t border-white/10 space-y-2">
              <button
                onClick={handleSendOrderWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all transform active:scale-95 animate-pulse-glow"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>إرسال الطلب عبر WhatsApp 🔥 ({netTotal} ج)</span>
              </button>

              <p className="text-[10px] text-center text-white/40">
                سيتم تحويلك إلى محادثة واتساب مع فرع بطروخ بالدقي لتأكيد الطلب فوراً.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
