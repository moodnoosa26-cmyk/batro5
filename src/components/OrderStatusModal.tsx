import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Bike, 
  ChefHat, 
  ShoppingBag, 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Check
} from 'lucide-react';
import { ActiveOrder, OrderProgressStage } from '../types';
import confetti from 'canvas-confetti';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ActiveOrder | null;
  onUpdateStage: (newStage: OrderProgressStage) => void;
  onNewOrder: () => void;
}

const STAGES: {
  id: OrderProgressStage;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
}[] = [
  {
    id: 'received',
    title: 'تم استلام وتأكيد الطلب',
    subtitle: 'تمت مراجعة الأصناف وتأكيدها من فرع الدقي الرئيسي',
    icon: CheckCircle2,
    color: 'text-blue-400 border-blue-500 bg-blue-500/20',
    badge: 'مؤكد ⚡',
  },
  {
    id: 'preparing',
    title: 'جاري التجهيز والطهي الفوري',
    subtitle: 'الشيف بيجهز أحلى تتبيلة وطواجن الفسفور في الفرن الحجري',
    icon: ChefHat,
    color: 'text-orange-400 border-orange-500 bg-orange-500/20',
    badge: 'على النار 🔥',
  },
  {
    id: 'on_the_way',
    title: 'الكابتن استلم الأوردر وفي الطريق',
    subtitle: 'الأوردر في شنطة حفظ الحرارة الحرارية في طريقه لعنوانك',
    icon: Bike,
    color: 'text-amber-400 border-amber-500 bg-amber-500/20',
    badge: 'في الطريق 🛵',
  },
  {
    id: 'delivered',
    title: 'تم التوصيل بالهناء والشفاء!',
    subtitle: 'ألف هنا وشفا! نتمنى لك تجربة فسفورية لا تُنسى 🚀',
    icon: Sparkles,
    color: 'text-emerald-400 border-emerald-500 bg-emerald-500/20',
    badge: 'تم الاستلام ✨',
  },
];

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateStage,
  onNewOrder,
}) => {
  const [isAutoSimulating, setIsAutoSimulating] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(8);

  if (!isOpen || !order) return null;

  const currentStageIndex = STAGES.findIndex((s) => s.id === order.currentStage);
  const activeStageInfo = STAGES[currentStageIndex] || STAGES[0];

  // Auto progression effect
  useEffect(() => {
    if (!isAutoSimulating) return;

    if (order.currentStage === 'delivered') return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Advance to next stage
          const nextIndex = currentStageIndex + 1;
          if (nextIndex < STAGES.length) {
            const nextStage = STAGES[nextIndex].id;
            onUpdateStage(nextStage);
            if (nextStage === 'delivered') {
              confetti({
                particleCount: 70,
                spread: 80,
                origin: { y: 0.5 },
              });
            }
          }
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoSimulating, order.currentStage, currentStageIndex, onUpdateStage]);

  const handleStageClick = (stage: OrderProgressStage) => {
    onUpdateStage(stage);
    setSecondsRemaining(8);
    if (stage === 'delivered') {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  const handleContactDriver = () => {
    const msg = encodeURIComponent(
      `مساء الخير يا كابتن، بخصوص أوردر مطعم بطروخ رقم #${order.orderNumber} باسم ${order.customerName}.. حابب أتابع موقع الوصول.`
    );
    window.open(`https://wa.me/201012560054?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050A18]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0A1128] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#050A18] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-lg">
              🚀
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-heading text-lg sm:text-xl text-white">
                  متابعة حالة الطلب Live
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-pulse">
                  مباشر
                </span>
              </div>
              <p className="text-xs text-white/60">
                رقم الأوردر: <span className="font-mono text-orange-400 font-bold">#{order.orderNumber}</span> • {order.createdAt}
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

        {/* Scrollable Tracker Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Status Hero Card */}
          <div className="p-5 sm:p-6 rounded-[28px] bg-gradient-to-b from-[#0F1C3F] to-[#0A1128] border border-white/15 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${activeStageInfo.color}`}>
                  <activeStageInfo.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-orange-400 text-xs font-bold mb-1">
                    {activeStageInfo.badge}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    {activeStageInfo.title}
                  </h4>
                  <p className="text-xs text-white/70 mt-0.5 font-normal">
                    {activeStageInfo.subtitle}
                  </p>
                </div>
              </div>

              {/* Scheduled Time Pill */}
              <div className="bg-[#050A18]/80 backdrop-blur-sm border border-white/10 p-3 rounded-2xl shrink-0 text-left sm:text-right">
                <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>موعد التوصيل المجدول:</span>
                </div>
                <div className="text-white font-bold text-sm mt-0.5">
                  {order.scheduledTimeSlot || 'توصيل فوري (30-45 دقيقة)'}
                </div>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((currentStageIndex + 1) / STAGES.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-white/60 font-medium">
                <span>استلام الطلب</span>
                <span>تجهيز بالفرن</span>
                <span>في الطريق</span>
                <span>تم التوصيل</span>
              </div>
            </div>
          </div>

          {/* Stepper Timeline Navigation (Interactive Progress) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/80">مراحل إعداد وتوصيل الأوردر:</span>
              
              {/* Simulation Auto-Play / Pause Controls */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50">
                  {order.currentStage !== 'delivered' && isAutoSimulating ? `التقدم التلقائي خلال (${secondsRemaining} ث)` : 'المحاكاة موقوفة'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAutoSimulating(!isAutoSimulating)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white/80 transition-colors"
                >
                  {isAutoSimulating ? (
                    <>
                      <Pause className="w-3 h-3 text-orange-400" />
                      <span>إيقاف مؤقت</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span>تشغيل المحاكاة</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STAGES.map((stg, index) => {
                const isPassed = index <= currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const StgIcon = stg.icon;

                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => handleStageClick(stg.id)}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 ${
                      isCurrent
                        ? 'bg-orange-600/20 border-orange-500 shadow-md shadow-orange-500/10'
                        : isPassed
                        ? 'bg-white/5 border-emerald-500/40 text-white/90'
                        : 'bg-white/5 border-white/5 text-white/40 hover:text-white/70 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-full ${isPassed ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-white/30'}`}>
                        <StgIcon className="w-4 h-4" />
                      </div>
                      {isPassed && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isCurrent ? 'text-orange-400' : isPassed ? 'text-white' : 'text-white/50'}`}>
                        {index + 1}. {stg.id === 'received' ? 'استلام' : stg.id === 'preparing' ? 'تجهيز' : stg.id === 'on_the_way' ? 'في الطريق' : 'تم التوصيل'}
                      </div>
                      <div className="text-[10px] text-white/50 truncate">
                        {stg.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Courier Card & Delivery Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Courier Info */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/70">كابتن التوصيل:</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  متصل الآن 🟢
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shrink-0">
                  <div className="w-full h-full bg-[#0A1128] rounded-full flex items-center justify-center text-lg">
                    🛵
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">كابتن محمود سامي</div>
                  <div className="text-xs text-white/60">موتوسيكل بطروخ السريع (رقم 42)</div>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleContactDriver}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>واتساب الكابتن</span>
                </button>
                <a
                  href="tel:+201012560054"
                  className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال</span>
                </a>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>عنوان وملاحظات التوصيل:</span>
                </div>
                <div className="text-xs text-white font-medium mt-2 leading-relaxed">
                  {order.deliveryAddress || 'استلام من فرع بطروخ بالدقي (شارع مصدق)'}
                </div>
                {order.orderNotes && (
                  <div className="text-[11px] text-white/60 italic mt-1">
                    ملاحظة: {order.orderNotes}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                <span>اسم المستلم: <strong className="text-white">{order.customerName}</strong></span>
                <span>{order.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Ordered Dishes Recap */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white/80">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-orange-500" />
                <span>أصناف الوجبة المطلوبة ({order.items.length}):</span>
              </span>
              <span className="text-orange-400 font-bold">{order.netTotal} ج.م</span>
            </div>

            <div className="divide-y divide-white/5 max-h-40 overflow-y-auto space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/5 text-orange-400 font-bold flex items-center justify-center text-[10px]">
                      {item.quantity}×
                    </span>
                    <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">
                      {item.dish.name}
                    </span>
                  </div>
                  <span className="text-white/70 font-mono">{item.totalPrice} ج</span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="pt-2 border-t border-white/10 flex justify-between text-xs text-white/70 font-medium">
              <span>طريقة الدفع: <strong>كاش عند الاستلام 💵</strong></span>
              <span>المجموع الصافي: <strong className="text-orange-500 text-sm">{order.netTotal} ج.م</strong></span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-[#050A18] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onNewOrder}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>طلب أوردر جديد 🛒</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleContactDriver}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>متابعة على الواتساب</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(234,88,12,0.35)] transition-colors"
            >
              إغلاق التتبع
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
