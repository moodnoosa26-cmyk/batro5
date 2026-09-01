import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Share2, MessageCircle, Send, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LocationContactSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTopic, setContactTopic] = useState('عزومة عائلية / حفلة');
  const [contactMsg, setContactMsg] = useState('');

  const addressText = 'مطعم بطروخ للمأكولات البحرية - شارع مصدق، متفرع من شارع التحرير، ميدان الدقي، محافظة الجيزة';
  const googleMapsUrl = 'https://maps.google.com/?q=30.0384,31.2124';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const handleShareLocationWhatsApp = () => {
    const text = encodeURIComponent(
      `📍 لوكيشن مطعم بطروخ للمأكولات البحرية في الدقي (بطروخ هيخليك صاروخ):\n${addressText}\nرابط خرائط جوجل: ${googleMapsUrl}\nالخط الساخن: 01023456789`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `رسالة استفسار وحجز من الموقع 🦐:\n- الاسم: ${contactName}\n- التليفون: ${contactPhone}\n- الموضوع: ${contactTopic}\n- التفاصيل: ${contactMsg}`
    );
    window.open(`https://wa.me/201023456789?text=${text}`, '_blank');
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#050A18] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs sm:text-sm font-medium">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>فرعنا في قلب الدقي والجيزة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white">
            زورنا أو اطلب دليفري لحد باب بيتك 📍
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-normal">
            موقع مميز وسهل الوصول في الدقي بالقرب من محطة المترو والتحرير والمهندسين.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Preview & Location Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Map Visual Frame */}
            <div className="relative rounded-[32px] overflow-hidden bg-[#0A1128] border border-white/10 shadow-2xl aspect-[16/10]">
              <iframe
                title="موقع مطعم بطروخ في الدقي"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13814.288220815124!2d31.20542385!3d30.038415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584128f7311df9%3A0xc3f588c42a222ceb!2sDokki%2C%20Giza%20Governorate!5e0!3m2!1sen!2seg!4v1680000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Map Action Overlay */}
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-[#0A1128]/95 backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-xl">
                <div>
                  <div className="text-white font-bold text-sm">فرع الدقي الرئيسي ⚓</div>
                  <div className="text-xs text-white/60">شارع مصدق - متفرع من التحرير</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>اتجاهات GPS</span>
                  </a>
                  <button
                    onClick={handleShareLocationWhatsApp}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>مشاركة اللوكيشن</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Working Hours */}
              <div className="p-5 rounded-[28px] bg-[#0A1128]/80 backdrop-blur-md border border-white/10 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>مواعيد العمل والدليفري:</span>
                </div>
                <div className="text-white font-bold text-base">مفتوح 24 ساعة يومياً ⚡</div>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  صالة مكيفة ومجهزة للعائلات + خدمة توصيل سريعة تغطي الدقي، العجوزة، المهندسين، بين السرايات، وفيصل والهرم.
                </p>
              </div>

              {/* Card 2: Contact Numbers & Copy */}
              <div className="p-5 rounded-[28px] bg-[#0A1128]/80 backdrop-blur-md border border-white/10 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>الخط الساخن والطلبات:</span>
                </div>
                <div className="flex items-center justify-between">
                  <a href="tel:01023456789" className="text-white font-bold text-lg hover:text-orange-400 transition-colors">
                    01023456789 📞
                  </a>
                  <button
                    onClick={handleCopyAddress}
                    className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>تم نسخ العنوان!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>نسخ العنوان</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-white/60">
                  واتساب الطلبات متاح 24 ساعة للرد الفوري.
                </p>
              </div>

            </div>

          </div>

          {/* Quick Inquiry / Reservation Form (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-[32px] bg-[#0A1128]/90 backdrop-blur-md border border-white/10 shadow-2xl space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                <span>حجز طاولات وعزومات خاصة</span>
              </h3>
              <p className="text-xs text-white/70 font-normal">
                عندك عزومة كبيرة أو حابب تجهز صواني فاخرة لضيوفك؟ ابعتلنا تفاصيلك وهنجهزها لك بأعلى خصم!
              </p>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">الاسم الكريم:</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="مثال: م. مصطفى كمال"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">رقم الموبايل / الواتساب:</label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="010xxxxxxxx"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">نوع الطلب / المناسبة:</label>
                <select
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#070D1E] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="عزومة عائلية / حفلة">عزومة عائلية / صواني لمة 👑</option>
                  <option value="حجز طاولة بالصالة">حجز طاولة بصالة المطعم 🍽️</option>
                  <option value="طلب دليفري لشركة / مكتب">أوردر شركات ومكاتب بالدقي 🏢</option>
                  <option value="استفسار عام أو اقتراح">استفسار عام أو شكوى 💬</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-white/80 block mb-1">تفاصيل إضافية (عدد الأفراد، الموعد، ملاحظات):</label>
                <textarea
                  rows={3}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="مثال: عايزين نجهز صينية ملوك لـ 8 أفراد بكرة الساعة 6 مساءً..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm shadow-lg transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الطلب فوراً عبر WhatsApp 💬</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
