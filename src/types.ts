export type DishCategory = 
  | 'all'
  | 'trays'         // صواني بطروخ
  | 'weights'       // الأوزان بالكيلو
  | 'grilled'       // وجبات المشوي ومشكل
  | 'casseroles'    // طواجن وصواني بطاطس
  | 'soups'         // شوربة ومقبلات
  | 'rice_pasta'    // وجبات أرز ومكرونات
  | 'sandwiches'    // ساندوتشات فرنساوي وبلدي
  | 'boxes'         // بوكسات الساندوتشات
  | 'appetizers'    // مقبلات وسلطات
  | 'drinks_desserts'; // مشروبات

export interface CookingOption {
  id: string;
  nameAr: string;
  priceExtra?: number;
}

export interface Dish {
  id: string;
  name: string;
  nameEn?: string;
  category: DishCategory;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  badge?: string;
  isSpicy?: boolean;
  phosphorusLevel?: 'high' | 'ultra' | 'legendary';
  prepTimeMinutes?: number;
  servesCount?: number;
  cookingOptions?: CookingOption[];
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isAvailable?: boolean;
  ingredients?: string[];
  portionInfo?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedCookingOption?: CookingOption;
  specialInstructions?: string;
  totalPrice: number;
}

export interface Review {
  id: string;
  authorName: string;
  location: string;
  rating: number;
  comment: string;
  dishOrdered?: string;
  date: string;
  avatarUrl?: string;
  verifiedOrder?: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
  tag: string;
  expiresInHours: number;
  itemsIncluded: string[];
  couponCode?: string;
}

export interface PromptItem {
  id: string;
  title: string;
  category: string;
  description: string;
  promptText: string;
  isMaster?: boolean;
}

export type OrderProgressStage = 'received' | 'preparing' | 'on_the_way' | 'delivered';

export interface ActiveOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: 'delivery' | 'takeaway' | 'dinein';
  deliveryAddress?: string;
  scheduledTimeSlot: string;
  orderNotes?: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  netTotal: number;
  couponCode?: string;
  currentStage: OrderProgressStage;
  stageUpdatedAt: number; // timestamp
  estimatedMinutesLeft: number;
}

export interface StoreSettings {
  hotline: string;
  whatsappPhone: string;
  deliveryFee: number;
  taxOrServiceRate: number; // 0.10 for dine-in
  bannerAnnouncement: string;
  isStoreOpen: boolean;
  isOpen24Hours?: boolean;
  restaurantNameAr?: string;
  sloganAr?: string;
  addressAr?: string;
  googleMapsUrl?: string;
  adminPasswordHash?: string;
}
