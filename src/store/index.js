import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../api/client';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ product, variant, quantity }]
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, variant, quantity = 1) => {
        const { items } = get();
        const key = `${product._id}_${variant?.name || 'default'}`;
        const existing = items.find((i) => i.key === key);
        if (existing) {
          set({ items: items.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) });
        } else {
          set({ items: [...items, { key, product, variant, quantity }] });
        }
        set({ isOpen: true });
      },

      removeItem: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

      updateQty: (key, quantity) => {
        if (quantity < 1) { get().removeItem(key); return; }
        set((s) => ({ items: s.items.map((i) => i.key === key ? { ...i, quantity } : i) }));
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, i) => {
          const price = i.variant?.price || i.product?.variants?.[0]?.price || 0;
          const disc = i.product?.discount || 0;
          const final = disc > 0 ? price - (price * disc / 100) : price;
          return sum + final * i.quantity;
        }, 0);
      },

      get count() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: 'siddhi_cart' }
  )
);

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const { data } = await apiClient.post('/auth/login', { email, password });
        const token = data?.data?.token || data?.token;
        const user = data?.data?.user || data?.user;
        localStorage.setItem('siddhi_token', token);
        set({ user, token });
        return data;
      },

      register: async (payload) => {
        const { data } = await apiClient.post('/auth/register', payload);
        const token = data?.data?.token || data?.token;
        const user = data?.data?.user || data?.user;
        localStorage.setItem('siddhi_token', token);
        set({ user, token });
        return data;
      },

      logout: () => {
        localStorage.removeItem('siddhi_token');
        set({ user: null, token: null });
      },

      isLoggedIn: () => !!get().token,
    }),
    { name: 'siddhi_auth', partialize: (s) => ({ user: s.user, token: s.token }) }
  )
);

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const { items } = get();
        const exists = items.find((i) => i._id === product._id);
        set({ items: exists ? items.filter((i) => i._id !== product._id) : [...items, product] });
      },
      has: (id) => get().items.some((i) => i._id === id),
    }),
    { name: 'siddhi_wishlist' }
  )
);
