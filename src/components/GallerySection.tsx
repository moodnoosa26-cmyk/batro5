import React, { useState } from 'react';
import { Camera, Eye, X, Flame } from 'lucide-react';
import heroImg from '../assets/images/batroukh_hero_seafood_1788219274003.jpg';
import tajineImg from '../assets/images/batroukh_tajine_dish_1788219288020.jpg';
import sandwichImg from '../assets/images/batroukh_rocket_sandwich_1788219304798.jpg';
import soupImg from '../assets/images/batroukh_soup_dish_1788219324970.jpg';

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryItems = [
    {
      img: heroImg,
      title: 'صينية الفسفور الملوكية الكاملة',
      tag: 'ولائم وعزومات',
    },
    {
      img: tajineImg,
      title: 'طاجن بطروخ بالكريمة والبطارخ النارية',
      tag: 'طواجن ساخنة',
    },
    {
      img: sandwichImg,
      title: 'ساندوتش صاروخ بطروخ كرانشي عملاق',
      tag: 'ساندوتشات الصاروخ',
    },
    {
      img: soupImg,
      title: 'شوربة سي فود بطروخ بالكريمة والجمبري',
      tag: 'شوربات فسفور',
    },
    {
      img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
      title: 'جمبري جامبو مشوي بتربلاي بالزبدة والثوم',
      tag: 'جريل ومشويات',
    },
    {
      img: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fdc2?auto=format&fit=crop&w=800&q=80',
      title: 'سمك قاروص ودنيس سنجاري بالخلطة الإسكندرانية',
      tag: 'صيد اليوم طازج',
    },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#050A18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs sm:text-sm font-medium">
            <Camera className="w-4 h-4 text-orange-500" />
            <span>معرض صور الأطباق الفاخرة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white">
            شاهد مأكولات بطروخ على أصولها 📸
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-normal">
            تصوير حقيقي لأطباقنا وطواجننا الطازجة الخارجة من الفرن على سفرتك في الدقي!
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(item.img)}
              className="group relative rounded-[32px] overflow-hidden aspect-[4/3] bg-[#0A1128] border border-white/10 cursor-pointer shadow-xl hover:border-orange-500/50 transition-colors"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A18] via-[#050A18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="p-2.5 rounded-full bg-[#0A1128]/90 text-orange-400 backdrop-blur-sm border border-white/10 shadow">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-orange-600 text-white text-[11px] font-bold inline-block mb-2 shadow">
                    {item.tag}
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050A18]/95 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-[#0A1128]/90 text-white hover:bg-orange-600 border border-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImage}
              alt="صورة مكبرة"
              className="w-full h-full object-contain max-h-[85vh] bg-[#050A18]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
