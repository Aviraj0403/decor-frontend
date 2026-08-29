import apiClient from '../api/client';

// ── Products ─────────────────────────────────────────────────
export const productAPI = {
  getAll: (params = {}) => apiClient.get('/products', { params }),
  getBySlug: (slug) => apiClient.get(`/products/getSingleProduct/${slug}`),
  getByCategory: (categorySlug, params = {}) =>
    apiClient.get('/products', { params: { category: categorySlug, ...params } }),
  getFeatured: () => apiClient.get('/products', { params: { isFeatured: true, limit: 8 } }),
  getNewArrivals: () => apiClient.get('/products', { params: { sort: '-createdAt', limit: 8 } }),
  getBestSellers: () => apiClient.get('/products', { params: { isBestSeller: true, limit: 8 } }),
  search: (q) => apiClient.get('/products', { params: { search: q } }),
};

// ── Categories ───────────────────────────────────────────────
export const categoryAPI = {
  getAll: () => apiClient.get('/category'),
  getMainCategories: () => apiClient.get('/category', { params: { type: 'Main' } }),
  getBySlug: (slug) => apiClient.get(`/category/${slug}`),
  getMenuCategories: () => apiClient.get('/category/getMenuCategories'),
};

// ── Orders ───────────────────────────────────────────────────
export const orderAPI = {
  place: (payload) => apiClient.post('/orders', payload),
  getMyOrders: () => apiClient.get('/orders/my'),
  getById: (id) => apiClient.get(`/orders/${id}`),
  track: (id) => apiClient.get(`/customer/track/${id}`),
};

// ── Payment ──────────────────────────────────────────────────
export const paymentAPI = {
  createOrder: (payload) => apiClient.post('/razorpay/create-order', payload),
  verify: (payload) => apiClient.post('/razorpay/verify', payload),
};

// ── Offers ───────────────────────────────────────────────────
export const offerAPI = {
  validate: (code) => apiClient.post('/offers/validate', { code }),
};

// ── Reviews ──────────────────────────────────────────────────
export const reviewAPI = {
  getForProduct: (productId) => apiClient.get(`/reviews/product/${productId}`),
  create: (payload) => apiClient.post('/reviews', payload),
  getUserReviews: () => apiClient.get('/reviews/user-reviews'),
};

// ── Shipping ─────────────────────────────────────────────────
export const shippingAPI = {
  checkPincode: (pincode) => apiClient.post('/shipping/check-pincode', { pincode }),
};

// ── Settings ─────────────────────────────────────────────────
export const settingsAPI = {
  get: () => apiClient.get('/admin/settings'),
};
