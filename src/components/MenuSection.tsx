import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Plus, Check, MessageCircle, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Dish, DishCategory, CookingOption } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { DishModal } from './DishModal';

interface MenuSectionProps {
  onAddToCart: (dish: Dish, quantity: number, selectedOption?: CookingOption, instructions?: string) => void;
  onOpenCart: () => void;
  dishes?: Dish[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenCart,
  dishes = MENU_ITEMS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'spicy' | 'offers'>('all');
  const [selectedDishForModal, setSelectedDishForModal] = useState<Dish | null>(null);

  // Filtering dishes
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Check if available
      if (dish.isAvailable === false) return false;

      // Category match
      const matchCategory = selectedCategory === 'all' || dish.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.ingredients?.some((ing) => ing.toLowerCase().includes(query));

      // Quick filter
      let matchQuick = true;
      if (activeFilter === 'popular') matchQuick = !!dish.isPopular;
      if (activeFilter === 'spicy') matchQuick = !!dish.isSpicy;
      if (activeFilter === 'offers') matchQuick = !!dish.originalPrice && dish.originalPrice > dish.price;

      return matchCategory && matchSearch && matchQuick;
    });
  }, [dishes, selectedCategory, searchQuery, activeFilter]);

  const handleQuickAdd = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    if (dish.cookingOptions && dish.cookingOptions.length > 0) {
      setSelectedDishForModal(dish);
    } else {
      onAddToCart(dish, 1);
    }
  };

  const handleDishWhatsApp = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `يا بطروخ! 🚀 عايز أطلب صنف: (${dish.name} - ${dish.price} ج) منيو الدقي. من فضلك عرفني التوصيل هياخد وقت قد ايه؟`
    );
    window.open(`https://wa.me/201012560054?text=${text}`, '_blank');
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#050A18] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs sm:text-sm font-medium">
            <Flame className="w-4 h-4 text-orange-500 fill-current" />
            <span>منيو الصواريخ والفسفور</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            اختر وجبتك البحرية المفضلة 🦐
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            أصناف طازجة 100% يومياً بتتبيلة بطروخ الخاصة - من ساندوتش الصاروخ السريع لحد صواني الملوك الفاخرة!
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Search Input & Quick Filter Chips */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن طاجن، جمبري، سبيط، ساندوتش صاروخ، قاروص..."
                className="w-full pl-4 pr-12 py-3.5 rounded-full bg-[#0A1128]/90 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs bg-white/10 px-2.5 py-1 rounded-full text-white/70 hover:text-white"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === 'all'
                    ? 'bg-orange-600 text-white shadow-[0_0_12px_rgba(234,88,12,0.4)]'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                الكل ({MENU_ITEMS.length})
              </button>
              <button
                onClick={() => setActiveFilter('popular')}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === 'popular'
                    ? 'bg-orange-600 text-white shadow-[0_0_12px_rgba(234,88,12,0.4)]'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                الأكثر طلباً 🔥
              </button>
              <button
                onClick={() => setActiveFilter('spicy')}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === 'spicy'
                    ? 'bg-red-600 text-white'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                سبايسي إسكندراني 🌶️
              </button>
              <button
                onClick={() => setActiveFilter('offers')}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === 'offers'
                    ? 'bg-emerald-500 text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                عروض وخصومات 💰
              </button>
            </div>
          </div>

          {/* Category Tabs Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as DishCategory)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                    : 'bg-white/5 border border-white/10 text-white/80 hover:border-orange-500/40 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{cat.nameAr}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-[32px] border border-white/10 space-y-3">
            <span className="text-4xl block">🔍</span>
            <h3 className="text-lg font-bold text-white">لم نجد أصناف تطابق بحثك</h3>
            <p className="text-xs text-white/60">جرب كتابة اسم صنف آخر مثل "طاجن"، "جمبري"، أو "ساندوتش"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveFilter('all');
              }}
              className="mt-2 px-5 py-2 rounded-full bg-orange-600 text-white font-bold text-xs shadow-md"
            >
              عرض كل الأصناف
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                id={`dish-card-${dish.id}`}
                onClick={() => setSelectedDishForModal(dish)}
                className="group cursor-pointer rounded-[32px] bg-[#0A1128]/80 backdrop-blur-md border border-white/10 hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-[0_0_25px_rgba(234,88,12,0.15)]"
              >
                {/* Dish Image Container */}
                <div className="relative aspect-video sm:aspect-[4/3] bg-[#070D1E] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-85" />

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    {dish.badge && (
                      <span className="px-3 py-1 rounded-full bg-orange-600 text-white font-bold text-[11px] shadow">
                        {dish.badge}
                      </span>
                    )}
                    {dish.phosphorusLevel === 'legendary' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-bold text-[10px] shadow">
                        ⚡ فسفور أسطوري
                      </span>
                    )}
                  </div>

                  {/* Preparation time & serves */}
                  <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-[11px] text-white/80 font-medium">
                    {dish.servesCount && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#050A18]/80 backdrop-blur-sm border border-white/10">
                        👥 يكفي {dish.servesCount} {dish.servesCount > 1 ? 'أفراد' : 'فرد'}
                      </span>
                    )}
                    {dish.prepTimeMinutes && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#050A18]/80 backdrop-blur-sm border border-white/10">
                        ⏱️ {dish.prepTimeMinutes} دقيقة
                      </span>
                    )}
                  </div>
                </div>

                {/* Dish Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        {dish.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-bold text-orange-500">
                          {dish.price}
                        </span>
                        <span className="text-xs text-orange-400 font-bold">ج.م</span>
                      </div>
                      {dish.originalPrice && (
                        <span className="text-xs text-white/40 line-through">
                          {dish.originalPrice} ج.م
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* WhatsApp Fast Trigger */}
                      <button
                        type="button"
                        onClick={(e) => handleDishWhatsApp(dish, e)}
                        className="p-2.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 transition-colors"
                        title="طلب عبر الواتساب"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(dish, e)}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(234,88,12,0.35)] transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>أضف للطلب</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Dish Customization Modal */}
      <DishModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={(dish, qty, opt, inst) => {
          onAddToCart(dish, qty, opt, inst);
        }}
      />
    </section>
  );
};
