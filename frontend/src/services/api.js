/**
 * API Service Layer
 * -----------------
 * Centralizes all HTTP calls to the backend using Axios.
 *
 * Frontend ↔ Backend Communication:
 *   Every React component calls functions from this file instead of
 *   making raw Axios requests. This decouples UI logic from HTTP details
 *   and makes it trivial to swap the backend URL or add auth headers.
 *
 *   Vite dev server proxies /api/* to localhost:5000 (see vite.config.js),
 *   so in development we can use relative paths. For production builds,
 *   we fall back to VITE_API_URL from the environment.
 */

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Product APIs ───────────────────────────────────────
export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const fetchCategories = () => API.get('/products/categories');

// ── Cart APIs ──────────────────────────────────────────
export const fetchCart = () => API.get('/cart');
export const addToCart = (product_id, quantity = 1) =>
  API.post('/cart', { product_id, quantity });
export const updateCartItem = (id, quantity) =>
  API.put(`/cart/${id}`, { quantity });
export const removeFromCart = (id) => API.delete(`/cart/${id}`);

// ── Order APIs ─────────────────────────────────────────
export const placeOrder = (shippingData) => API.post('/orders', shippingData);
export const fetchOrder = (id) => API.get(`/orders/${id}`);
export const fetchUserOrders = () => API.get('/orders/user');

// ── Wishlist APIs ──────────────────────────────────────
export const fetchWishlist = () => API.get('/wishlist');
export const addToWishlist = (product_id) =>
  API.post('/wishlist', { product_id });
export const removeFromWishlist = (id) => API.delete(`/wishlist/${id}`);

export default API;
