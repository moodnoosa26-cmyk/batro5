import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  writeBatch,
  getDocs
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { Dish, StoreSettings, ActiveOrder, OrderProgressStage } from './types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom Database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const DISHES_COLLECTION = 'dishes';
const SETTINGS_DOC = 'main';
const SETTINGS_COLLECTION = 'settings';
const ORDERS_COLLECTION = 'orders';

/**
 * Real-time subscription to dishes from Cloud Firestore.
 * Automatically seeds initial dishes if Firestore collection is empty.
 */
export function subscribeToDishes(
  onDishesUpdate: (dishes: Dish[]) => void,
  initialFallbackDishes: Dish[]
) {
  const dishesRef = collection(db, DISHES_COLLECTION);
  
  const unsubscribe = onSnapshot(
    dishesRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed initial menu items to Cloud Firestore
        console.log('⚡ Firestore dishes collection is empty. Seeding initial menu items...');
        await seedInitialDishes(initialFallbackDishes);
      } else {
        const loadedDishes: Dish[] = [];
        snapshot.forEach((docSnap) => {
          loadedDishes.push(docSnap.data() as Dish);
        });
        onDishesUpdate(loadedDishes);
      }
    },
    (error) => {
      console.error('Error listening to dishes in Firestore:', error);
    }
  );

  return unsubscribe;
}

/**
 * Seed initial dishes into Firestore batch
 */
export async function seedInitialDishes(dishes: Dish[]) {
  try {
    const batch = writeBatch(db);
    dishes.forEach((dish) => {
      const docRef = doc(db, DISHES_COLLECTION, dish.id);
      batch.set(docRef, { ...dish, updatedAt: new Date().toISOString() });
    });
    await batch.commit();
    console.log('✅ Initial dishes successfully seeded to Firebase Cloud Firestore.');
  } catch (err) {
    console.error('Failed to seed dishes to Firestore:', err);
  }
}

/**
 * Save or update a single dish in Cloud Firestore
 */
export async function saveDishToCloud(dish: Dish): Promise<void> {
  try {
    const docRef = doc(db, DISHES_COLLECTION, dish.id);
    await setDoc(docRef, {
      ...dish,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving dish to Cloud Firestore:', error);
    throw error;
  }
}

/**
 * Delete a dish from Cloud Firestore
 */
export async function deleteDishFromCloud(dishId: string): Promise<void> {
  try {
    const docRef = doc(db, DISHES_COLLECTION, dishId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting dish from Cloud Firestore:', error);
    throw error;
  }
}

/**
 * Reset all dishes in Cloud Firestore to initial original menu
 */
export async function resetDishesInCloud(originalDishes: Dish[]): Promise<void> {
  try {
    // 1. Delete existing docs
    const existingSnap = await getDocs(collection(db, DISHES_COLLECTION));
    const batch = writeBatch(db);
    existingSnap.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    // 2. Add original dishes
    originalDishes.forEach((dish) => {
      const docRef = doc(db, DISHES_COLLECTION, dish.id);
      batch.set(docRef, { ...dish, updatedAt: new Date().toISOString() });
    });
    await batch.commit();
  } catch (error) {
    console.error('Error resetting dishes in Cloud Firestore:', error);
    throw error;
  }
}

/**
 * Real-time subscription to store settings
 */
export function subscribeToStoreSettings(
  onSettingsUpdate: (settings: StoreSettings) => void,
  defaultSettings: StoreSettings
) {
  const settingsDocRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);

  const unsubscribe = onSnapshot(
    settingsDocRef,
    async (docSnap) => {
      if (!docSnap.exists()) {
        // Seed default store settings
        console.log('⚡ Initializing default Store Settings in Cloud Firestore...');
        await setDoc(settingsDocRef, {
          ...defaultSettings,
          updatedAt: new Date().toISOString(),
        });
        onSettingsUpdate(defaultSettings);
      } else {
        onSettingsUpdate(docSnap.data() as StoreSettings);
      }
    },
    (error) => {
      console.error('Error listening to Store Settings in Firestore:', error);
    }
  );

  return unsubscribe;
}

/**
 * Save store settings to Cloud Firestore
 */
export async function saveStoreSettingsToCloud(settings: StoreSettings): Promise<void> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving settings to Cloud Firestore:', error);
    throw error;
  }
}

/**
 * Real-time subscription to customer orders
 */
export function subscribeToOrders(
  onOrdersUpdate: (orders: ActiveOrder[]) => void
) {
  const ordersQuery = query(
    collection(db, ORDERS_COLLECTION),
    orderBy('createdAtTimestamp', 'desc')
  );

  const unsubscribe = onSnapshot(
    ordersQuery,
    (snapshot) => {
      const ordersList: ActiveOrder[] = [];
      snapshot.forEach((docSnap) => {
        ordersList.push(docSnap.data() as ActiveOrder);
      });
      onOrdersUpdate(ordersList);
    },
    (error) => {
      console.error('Error listening to Orders in Firestore:', error);
    }
  );

  return unsubscribe;
}

/**
 * Save a new order to Cloud Firestore
 */
export async function saveOrderToCloud(order: ActiveOrder): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(docRef, {
      ...order,
      createdAtTimestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error saving order to Cloud Firestore:', error);
    throw error;
  }
}

/**
 * Update order stage in Cloud Firestore
 */
export async function updateOrderStatusInCloud(
  orderId: string,
  newStage: OrderProgressStage
): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await setDoc(
      docRef,
      {
        currentStage: newStage,
        stageUpdatedAt: Date.now(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating order stage in Cloud Firestore:', error);
    throw error;
  }
}
