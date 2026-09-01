import React, { useState } from 'react';
import { X, Flame, Sparkles, Check, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Dish, CookingOption } from '../types';

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, selectedOption?: CookingOption, instructions?: string) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<CookingOption | undefined>(
    dish.cookingOptions && dish.cookingOptions.length > 0 ? dish.cookingOptions[0] : undefined
  );
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  const optionExtra = selectedOption?.priceExtra || 0;
  const unitPrice = dish.price + optionExtra;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(dish, quantity, selectedOption, specialInstructions.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050A18]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0A1128] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          
          {/* Dish Header Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#050A18] border border-white/10">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            {dish.badge && (
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs shadow-md">
                {dish.badge}
              </span>
            )}
          </div>

          {/* Dish Title & Price */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {dish.name}
              </h3>
              <div className="text-left shrink-0">
                <span className="text-2xl font-bold text-orange-500">{dish.price} ج</span>
                {dish.originalPrice && (
                  <span className="text-xs line-through text-white/40 block">{dish.originalPrice} ج</span>
                )}
              </div>
            </div>
            <p className="text-white/70 text-sm mt-2 leading-relaxed font-normal">
              {dish.description}
            </p>
          </div>

          {/* Ingredients list if present */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/60 block">المكونات وتفاصيل التتبيلة:</span>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium">
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cooking Options / Customization */}
          {dish.cookingOptions && dish.cookingOptions.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>طريقة التسوية والخلطة المفضلة:</span>
              </label>
              <div className="space-y-2">
                {dish.cookingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-right transition-all ${
                      selectedOption?.id === opt.id
                        ? 'bg-orange-600/20 border-orange-500 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedOption?.id === opt.id ? 'border-orange-500 bg-orange-600' : 'border-white/30'}`}>
                        {selectedOption?.id === opt.id && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                      <span className="text-sm">{opt.nameAr}</span>
                    </div>
                    {opt.priceExtra ? (
                      <span className="text-xs text-orange-400 font-bold">+{opt.priceExtra} ج</span>
                    ) : (
                      <span className="text-xs text-white/40 font-medium">مشمول</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/80">
              ملاحظات خاصة للشيف (زيادة ليمون، شطة زيادة، بدون طحينة...):
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="مثال: ليمون وشبت زيادة، تسوية مقرمشة..."
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

        </div>

        {/* Modal Footer (Quantity & Add to Cart) */}
        <div className="p-4 sm:p-5 bg-[#050A18] border-t border-white/10 flex items-center gap-3">
          
          {/* Quantity Controls */}
          <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-bold text-white text-base">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-between px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-base shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all transform active:scale-95"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>إضافة للطلب</span>
            </div>
            <span className="text-base font-bold">{totalPrice} ج</span>
          </button>

        </div>

      </div>
    </div>
  );
};
