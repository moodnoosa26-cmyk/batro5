import React, { useState, useEffect, useRef } from 'react';
import { Dish, CartItem, CookingOption, ActiveOrder, OrderProgressStage, StoreSettings } from './types';
import { MENU_ITEMS } from './data/menuData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OffersSection } from './components/OffersSection';
import { MenuSection } from './components/MenuSection';
import { PhosphorusCalculator } from './components/PhosphorusCalculator';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContactSection } from './components/LocationContactSection';
import { CartDrawer } from './components/CartDrawer';
import { OrderStatusModal } from './components/OrderStatusModal';
import { OrderInvoiceModal } from './components/OrderInvoiceModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { IntroAudioSplash } from './components/IntroAudioSplash';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';

const DEFAULT_STORE_SETTINGS: StoreSettings = {
  restaurantNameAr: 'مطعم بطروخ للمأكولات البحرية',
  sloganAr: 'بطروخ هيخليك صاروخ 🚀',
  hotline: '01023456789',
  whatsappPhone: '01023456789',
  addressAr: 'شارع مصدق، متفرع من شارع التحرير، الدقي، الجيزة',
  googleMapsUrl: 'https://maps.google.com/?q=30.0384,31.2124',
  isOpen24Hours: true,
  isStoreOpen: true,
  deliveryFee: 25,
  taxOrServiceRate: 0.10,
  bannerAnnouncement: '🔥 عرض الصاروخ: اطلب صينية الفسفور الملكية واحصل على طاجن بطروخ مجاناً + توصيل 24 ساعة في الدقي والجيزة!',
};

export default function App() {
  // Dishes state (editable via admin dashboard)
  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const saved = localStorage.getItem('batroukh_dishes_v2');
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  // Store settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('batroukh_store_settings');
      return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('batroukh_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Current Order
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(() => {
    try {
      const savedOrder = localStorage.getItem('batroukh_active_order');
      return savedOrder ? JSON.parse(savedOrder) : null;
    } catch {
      return null;
    }
  });

  // Orders History
  const [ordersHistory, setOrdersHistory] = useState<ActiveOrder[]>(() => {
    try {
      const saved = localStorage.getItem('batroukh_orders_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<ActiveOrder | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);

  // Secret 5-Click on Logo detection
  const [logoClickCount, setLogoClickCount] = useState<number>(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Persist dishes
  useEffect(() => {
    try {
      localStorage.setItem('batroukh_dishes_v2', JSON.stringify(dishes));
    } catch {
      // ignore
    }
  }, [dishes]);

  // Persist store settings
  useEffect(() => {
    try {
      localStorage.setItem('batroukh_store_settings', JSON.stringify(storeSettings));
    } catch {
      // ignore
    }
  }, [storeSettings]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('batroukh_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Persist active order
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('batroukh_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('batroukh_active_order');
      }
    } catch {
      // ignore
    }
  }, [activeOrder]);

  // Persist orders history
  useEffect(() => {
    try {
      localStorage.setItem('batroukh_orders_history', JSON.stringify(ordersHistory));
    } catch {
      // ignore
    }
  }, [ordersHistory]);

  // Secret 5-tap handler on Logo
  const handleLogoTap = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);

    if (nextCount >= 5) {
      setLogoClickCount(0);
      setIsAdminDashboardOpen(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.3 },
      });
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setLogoClickCount(0);
      }, 3000); // 3 seconds window for 5 clicks
    }
  };

  const handleAddToCart = (
    dish: Dish,
    quantity = 1,
    selectedOption?: CookingOption,
    specialInstructions?: string
  ) => {
    const optionExtra = selectedOption?.priceExtra || 0;
    const unitPrice = dish.price + optionExtra;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.dish.id === dish.id &&
          item.selectedCookingOption?.id === selectedOption?.id &&
          (item.specialInstructions || '') === (specialInstructions || '')
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          dish,
          quantity,
          selectedCookingOption: selectedOption,
          specialInstructions,
          totalPrice: unitPrice * quantity,
        };
        return [...prevItems, newItem];
      }
    });

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      const optionExtra = item.selectedCookingOption?.priceExtra || 0;
      const unitPrice = item.dish.price + optionExtra;
      updated[index] = {
        ...item,
        quantity: newQty,
        totalPrice: unitPrice * newQty,
      };
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (newOrder: ActiveOrder) => {
    setActiveOrder(newOrder);
    setOrdersHistory((prev) => [newOrder, ...prev.slice(0, 49)]); // keep last 50 orders
    setCartItems([]);
    setSelectedInvoiceOrder(newOrder);
    setIsInvoiceModalOpen(true);
  };

  const handleUpdateOrderStatusStage = (newStage: OrderProgressStage) => {
    if (!activeOrder) return;
    setActiveOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentStage: newStage,
        stageUpdatedAt: Date.now(),
      };
    });
  };

  const handleStartNewOrder = () => {
    setActiveOrder(null);
    setCartItems([]);
    setIsOrderStatusModalOpen(false);
    setIsCartOpen(false);
    scrollToSection('menu');
  };

  const handleViewInvoice = (order: ActiveOrder) => {
    setSelectedInvoiceOrder(order);
    setIsInvoiceModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050A18] text-white font-['Cairo',sans-serif] selection:bg-orange-500 selection:text-white relative">
      
      {/* Intro Egyptian Audio & Slogan Splash */}
      <IntroAudioSplash onComplete={() => {}} />

      {/* Announcement Ticker Bar */}
      {storeSettings.bannerAnnouncement && (
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-xs font-bold py-1.5 px-4 text-center overflow-hidden border-b border-orange-500/30">
          <div className="animate-pulse flex items-center justify-center gap-2">
            <span>{storeSettings.bannerAnnouncement}</span>
          </div>
        </div>
      )}

      {/* Top Sticky Header with Secret Logo Tap Trigger */}
      <Navbar
        cartItems={cartItems}
        activeOrder={activeOrder}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderStatus={() => setIsOrderStatusModalOpen(true)}
        onLogoClick={handleLogoTap}
        logoClickCount={logoClickCount}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        storeSettings={storeSettings}
      />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onOpenCart={() => setIsCartOpen(true)}
          onExploreMenu={() => scrollToSection('menu')}
          onOpenCalculator={() => scrollToSection('calculator')}
        />

        {/* 2. Exclusive Flash Offers */}
        <OffersSection
          onAddOfferToCart={(offerDish) => handleAddToCart(offerDish, 1)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 3. Interactive Menu Section (with dynamic dishes) */}
        <MenuSection
          dishes={dishes}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 4. Phosphorus Booster Calculator */}
        <PhosphorusCalculator
          onAddDishToCart={(dish) => handleAddToCart(dish, 1)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 5. Food Photography Gallery */}
        <GallerySection />

        {/* 6. Customer Reviews & Social Proof */}
        <ReviewsSection />

        {/* 7. Branch Location, Maps, Social Media & Contact */}
        <LocationContactSection />
      </main>

      {/* Footer with Secret Admin access & Official Social links */}
      <Footer
        onLogoClick={handleLogoTap}
        logoClickCount={logoClickCount}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
      />

      {/* Cart & Checkout Drawer with Scheduled Delivery */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Official Itemized Printable Invoice Modal */}
      <OrderInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        order={selectedInvoiceOrder}
        onTrackOrder={() => setIsOrderStatusModalOpen(true)}
      />

      {/* Live Order Status Simulator Modal */}
      <OrderStatusModal
        isOpen={isOrderStatusModalOpen}
        onClose={() => setIsOrderStatusModalOpen(false)}
        order={activeOrder}
        onUpdateStage={handleUpdateOrderStatusStage}
        onNewOrder={handleStartNewOrder}
      />

      {/* Secret Encrypted Admin Dashboard (Password: بطروخ / 5 Clicks on Logo) */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        dishes={dishes}
        onUpdateDishes={setDishes}
        onResetDishes={() => setDishes(MENU_ITEMS)}
        activeOrder={activeOrder}
        ordersHistory={ordersHistory}
        storeSettings={storeSettings}
        onUpdateStoreSettings={setStoreSettings}
        onViewInvoice={handleViewInvoice}
      />

      {/* Floating Action Buttons (WhatsApp, Call, Cart, Live Tracker) */}
      <FloatingActions
        cartItems={cartItems}
        activeOrder={activeOrder}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderStatus={() => setIsOrderStatusModalOpen(true)}
      />

    </div>
  );
}
