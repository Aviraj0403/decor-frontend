// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
// import productReducer from '../features/product/productSlice';
// import orderReducer from '../features/order/orderSlice';
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth', 'cart'],
  stateReconciler: autoMergeLevel2,
};

// combineReducers use karo → yeh function return karta hai
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // products: productReducer,
  // orders: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);