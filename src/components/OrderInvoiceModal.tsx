import React from 'react';
import { X, Printer, Share2, MessageCircle, CheckCircle2, Bike, Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { ActiveOrder } from '../types';
import { BatroukhLogo } from './BatroukhLogo';

interface OrderInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ActiveOrder | null;
  onTrackOrder?: () => void;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({
  isOpen,
  onClose,
  order,
  onTrackOrder,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendToWhatsApp = () => {
    const lines = [
      `🧾 *فاتورة أوردر مطعم بطروخ للمأكولات البحرية* 🦐🚀`,
      `══════════════════════════`,
      `🔹 *رقم الفاتورة:* #${order.orderNumber}`,
      `📅 *تاريخ الطلب:* ${order.createdAt}`,
      `⏰ *الموعد المجدول:* ${order.scheduledTimeSlot}`,
      `👤 *اسم العميل:* ${order.customerName}`,
      `📞 *رقم الهاتف:* ${order.customerPhone}`,
      order.orderType === 'delivery' ? `📍 *عنوان التوصيل:* ${order.deliveryAddress}` : `🏬 *نوع الطلب:* استلام تيك أواي من المطعم`,
      order.orderNotes ? `📝 *ملاحظات خاصة:* ${order.orderNotes}` : '',
      `══════════════════════════`,
      `📋 *الأصناف والطلبات:*`,
      ...order.items.map((item, index) => {
        const optionStr = item.selectedCookingOption ? ` (${item.selectedCookingOption.nameAr})` : '';
        return `${index + 1}. *${item.dish.name}* ${optionStr}\n   ▫️ الكمية: ${item.quantity} × ${item.dish.price + (item.selectedCookingOption?.priceExtra || 0)} ج = *${item.totalPrice} ج*`;
      }),
      `══════════════════════════`,
      `💵 *المجموع الفرعي:* ${order.subtotal} جنيه`,
      order.discountAmount > 0 ? `🎁 *خصم العرض:* -${order.discountAmount} جنيه (${order.couponCode || 'خصم مباشر'})` : '',
      order.orderType === 'delivery' ? `🛵 *خدمة التوصيل:* +${order.deliveryFee} جنيه` : '',
      `🔥 *الإجمالي النهائي للدفع:* *${order.netTotal} جنيه مصري*`,
      `══════════════════════════`,
      `✨ *مطعم بطروخ هيخليك صاروخ!* 🚀`,
      `📍 الدقي - شارع التحرير | الخط الساخن: +201012560054`,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/201012560054?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#030712]/95 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-[32px] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto border border-slate-200 print:border-none print:shadow-none print:w-full print:max-w-none text-right">
        
        {/* Header Bar for Screen Display */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-400">فاتورة رسمية معتمدة</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              أوردر #{order.orderNumber}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Printable Body */}
        <div className="p-6 sm:p-8 space-y-6" id="printable-invoice">
          
          {/* Restaurant Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-slate-300 pb-5">
            <div className="text-right">
              <h1 className="text-2xl font-black text-slate-900 font-heading tracking-tight">
                مطعم بطروخ للمأكولات البحرية
              </h1>
              <p className="text-xs font-bold text-orange-600">
                « بطروخ هيخليك صاروخ 🚀 »
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                سجل تجاري وبطاقة ضريبية معتمدة | الدقي، الجيزة
              </p>
              <p className="text-[11px] text-slate-600 font-mono">
                📞 الخط الساخن: +201012560054
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">🦐</span>
            </div>
          </div>

          {/* Bill Meta Data */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">رقم الفاتورة:</span>
              <strong className="text-slate-900 font-mono text-sm">#{order.orderNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">تاريخ وساعة الطلب:</span>
              <strong className="text-slate-900 font-mono">{order.createdAt}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">اسم العميل:</span>
              <strong className="text-slate-900">{order.customerName} ({order.customerPhone})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">الموعد المجدول للاستلام:</span>
              <strong className="text-orange-600 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{order.scheduledTimeSlot}</span>
              </strong>
            </div>

            {order.orderType === 'delivery' && (
              <div className="col-span-2 pt-1 border-t border-slate-200">
                <span className="text-slate-500 block">عنوان التوصيل المعتمد:</span>
                <strong className="text-slate-800">{order.deliveryAddress}</strong>
              </div>
            )}
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500 text-right pb-2">
                  <th className="py-2 pr-1 font-bold">الصنف والتفاصيل</th>
                  <th className="py-2 text-center font-bold">الكمية</th>
                  <th className="py-2 text-center font-bold">سعر الوحدة</th>
                  <th className="py-2 pl-1 text-left font-bold">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, index) => (
                  <tr key={index} className="py-2">
                    <td className="py-2.5 pr-1">
                      <strong className="text-slate-900 block">{item.dish.name}</strong>
                      {item.selectedCookingOption && (
                        <span className="text-[10px] text-orange-600 block">
                          • {item.selectedCookingOption.nameAr}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-center font-mono font-bold text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="py-2.5 text-center font-mono text-slate-600">
                      {item.dish.price + (item.selectedCookingOption?.priceExtra || 0)} ج
                    </td>
                    <td className="py-2.5 pl-1 text-left font-mono font-bold text-slate-900">
                      {item.totalPrice} ج
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="border-t-2 border-slate-300 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>المجموع الفرعي للأصناف:</span>
              <span className="font-mono font-bold">{order.subtotal} جنيه</span>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>خصم الكوبون ({order.couponCode || 'عرض خاص'}):</span>
                <span className="font-mono">-{order.discountAmount} جنيه</span>
              </div>
            )}

            {order.orderType === 'delivery' && (
              <div className="flex justify-between text-slate-600">
                <span>رسوم التوصيل:</span>
                <span className="font-mono">{order.deliveryFee} جنيه</span>
              </div>
            )}

            <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-2 bg-orange-50 p-3 rounded-xl">
              <span>الإجمالي المطلوب سداده:</span>
              <span className="font-mono text-orange-600 text-lg">{order.netTotal} جنيه مصري</span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-slate-400 border-t border-dashed border-slate-200 pt-3">
            شكراً لثقتكم في مطعم بطروخ! بالهناء والشفاء، ويسعدنا دائماً خدمتكم. 🦐🔥
          </div>

        </div>

        {/* Action Buttons (Print, WhatsApp, Track) */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الفاتورة</span>
            </button>

            <button
              onClick={handleSendToWhatsApp}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال للواتساب 💬</span>
            </button>
          </div>

          {onTrackOrder && (
            <button
              onClick={() => {
                onClose();
                onTrackOrder();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow"
            >
              <Bike className="w-4 h-4" />
              <span>متابعة حالة الطلب Live 🛵</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
