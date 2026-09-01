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
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';
import {
  subscribeToDishes,
  subscribeToStoreSettings,
  subscribeToOrders,
  saveDishToCloud,
  deleteDishFromCloud,
  resetDishesInCloud,
  saveStoreSettingsToCloud,
  saveOrderToCloud,
  updateOrderStatusInCloud,
} from './firebase';

const DEFAULT_STORE_SETTINGS: StoreSettings = {
  restaurantNameAr: 'مطعم بطروخ للمأكولات البحرية',
  sloganAr: 'بطروخ هيخليك صاروخ 🚀',
  hotline: '+201012560054',
  whatsappPhone: '+201012560054',
  addressAr: 'شارع مصدق، متفرع من شارع التحرير، الدقي، الجيزة',
  googleMapsUrl: 'https://maps.google.com/?q=30.0384,31.2124',
  isOpen24Hours: true,
  isStoreOpen: true,
  deliveryFee: 25,
  taxOrServiceRate: 0.10,
  bannerAnnouncement: '🔥 عرض الصاروخ: اطلب صينية الفسفور الملكية واحصل على طاجن بطروخ مجاناً + توصيل 24 ساعة في الدقي والجيزة!',
};

export default function App() {
  // Dishes state (synchronized live with Cloud Firestore)
  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const saved = localStorage.getItem('batroukh_dishes_v2');
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  // Store settings (synchronized live with Cloud Firestore)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('batroukh_store_settings');
      return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  // Cart State (Local for current shopper)
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

  // Orders History (synchronized live with Cloud Firestore)
  const [ordersHistory, setOrdersHistory] = useState<ActiveOrder[]>(() => {
    try {
      const saved = localStorage.getItem('batroukh_orders_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cloud status flag
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(true);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<ActiveOrder | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);

  // Secret 5-Click on Logo detection
  const [logoClickCount, setLogoClickCount] = useState<number>(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Subscribe to Live Cloud Firestore Dishes
  useEffect(() => {
    const unsubscribe = subscribeToDishes((liveDishes) => {
      if (liveDishes && liveDishes.length > 0) {
        setDishes(liveDishes);
        try {
          localStorage.setItem('batroukh_dishes_v2', JSON.stringify(liveDishes));
        } catch {
          // ignore
        }
      }
    }, MENU_ITEMS);

    return () => unsubscribe();
  }, []);

  // 2. Subscribe to Live Cloud Firestore Store Settings
  useEffect(() => {
    const unsubscribe = subscribeToStoreSettings((liveSettings) => {
      if (liveSettings) {
        setStoreSettings(liveSettings);
        try {
          localStorage.setItem('batroukh_store_settings', JSON.stringify(liveSettings));
        } catch {
          // ignore
        }
      }
    }, DEFAULT_STORE_SETTINGS);

    return () => unsubscribe();
  }, []);

  // 3. Subscribe to Live Cloud Firestore Orders
  useEffect(() => {
    const unsubscribe = subscribeToOrders((liveOrders) => {
      if (liveOrders) {
        setOrdersHistory(liveOrders);
        try {
          localStorage.setItem('batroukh_orders_history', JSON.stringify(liveOrders));
        } catch {
          // ignore
        }

        // Also update active order if its status changed in cloud by admin
        if (activeOrder) {
          const updatedActive = liveOrders.find((o) => o.id === activeOrder.id);
          if (updatedActive && updatedActive.currentStage !== activeOrder.currentStage) {
            setActiveOrder(updatedActive);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [activeOrder]);

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

  // Place order: save to local state AND push to Firebase Cloud Firestore
  const handleOrderPlaced = async (newOrder: ActiveOrder) => {
    setActiveOrder(newOrder);
    setOrdersHistory((prev) => [newOrder, ...prev.slice(0, 49)]);
    setCartItems([]);
    setSelectedInvoiceOrder(newOrder);
    setIsInvoiceModalOpen(true);

    try {
      await saveOrderToCloud(newOrder);
    } catch (err) {
      console.warn('Order saved locally, cloud sync error:', err);
    }
  };

  // Update order status: update in Cloud Firestore
  const handleUpdateOrderStatusStage = async (newStage: OrderProgressStage) => {
    if (!activeOrder) return;
    const updated = {
      ...activeOrder,
      currentStage: newStage,
      stageUpdatedAt: Date.now(),
    };
    setActiveOrder(updated);

    try {
      await updateOrderStatusInCloud(activeOrder.id, newStage);
    } catch (err) {
      console.warn('Status updated locally, cloud error:', err);
    }
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

  // Cloud Dishes Handlers for Admin
  const handleUpdateDishes = async (updatedDishes: Dish[]) => {
    setDishes(updatedDishes);
  };

  const handleSaveSingleDish = async (dish: Dish) => {
    // Optimistic update
    setDishes((prev) => {
      const idx = prev.findIndex((d) => d.id === dish.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = dish;
        return copy;
      }
      return [dish, ...prev];
    });
    // Cloud Firestore save
    await saveDishToCloud(dish);
  };

  const handleDeleteSingleDish = async (dishId: string) => {
    // Optimistic update
    setDishes((prev) => prev.filter((d) => d.id !== dishId));
    // Cloud Firestore delete
    await deleteDishFromCloud(dishId);
  };

  const handleResetDishes = async () => {
    setDishes(MENU_ITEMS);
    await resetDishesInCloud(MENU_ITEMS);
  };

  const handleUpdateStoreSettings = async (settings: StoreSettings) => {
    setStoreSettings(settings);
    await saveStoreSettingsToCloud(settings);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050A18] text-white font-['Cairo',sans-serif] selection:bg-orange-500 selection:text-white relative">
      
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

        {/* 3. Interactive Menu Section (with dynamic live dishes from Cloud Firestore) */}
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

      {/* Secret Encrypted Admin Dashboard (Connected to Firebase Cloud Firestore) */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        dishes={dishes}
        onUpdateDishes={handleUpdateDishes}
        onSaveSingleDish={handleSaveSingleDish}
        onDeleteSingleDish={handleDeleteSingleDish}
        onResetDishes={handleResetDishes}
        activeOrder={activeOrder}
        ordersHistory={ordersHistory}
        storeSettings={storeSettings}
        onUpdateStoreSettings={handleUpdateStoreSettings}
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
