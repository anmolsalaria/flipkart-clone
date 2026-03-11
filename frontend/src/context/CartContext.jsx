/**
 * Cart Context (React Context API)
 * ---------------------------------
 * Provides global cart state to every component in the tree.
 *
 * Why Context instead of props?
 *   - The cart count is needed in the Navbar (top of tree)
 *   - Cart mutations happen in ProductCard, ProductDetail, Cart page
 *   - Prop-drilling would be deeply nested and fragile
 *
 * State is always kept in sync with the DB:
 *   Every mutation (add / update / remove) calls the API first,
 *   then sets local state from the API response. This ensures
 *   the UI never shows stale data.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Total number of items (sum of quantities) — displayed on the cart icon
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal — sum of (price × quantity)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fetch cart from server on mount
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.fetchCart();
      setCartItems(data.data);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addItem = async (productId, quantity = 1) => {
    const { data } = await api.addToCart(productId, quantity);
    setCartItems(data.data);
  };

  const updateItem = async (cartId, quantity) => {
    const { data } = await api.updateCartItem(cartId, quantity);
    setCartItems(data.data);
  };

  const removeItem = async (cartId) => {
    const { data } = await api.removeFromCart(cartId);
    setCartItems(data.data);
  };

  // After order placement, clear local cart state
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, subtotal, loading, addItem, updateItem, removeItem, clearCart, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
