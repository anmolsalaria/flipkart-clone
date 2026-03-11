/**
 * Wishlist Page
 * -------------
 * Route: /wishlist
 *
 * Displays all wishlisted products with options to:
 *   - Move to cart
 *   - Remove from wishlist
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWishlist, removeFromWishlist } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ToastProvider';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const loadWishlist = async () => {
    try {
      const { data } = await fetchWishlist();
      setItems(data.data);
    } catch {
      showToast('Failed to load wishlist', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (wishlistId) => {
    try {
      const { data } = await removeFromWishlist(wishlistId);
      setItems(data.data);
      showToast('Removed from wishlist', 'info');
    } catch {
      showToast('Failed to remove', 'error');
    }
  };

  const handleMoveToCart = async (item) => {
    try {
      await addItem(item.product_id);
      await removeFromWishlist(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`${item.name} moved to cart!`, 'success');
    } catch {
      showToast('Failed to move to cart', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">❤️</div>
        <h2 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-1 mb-6">Save items you love for later!</p>
        <Link
          to="/"
          className="inline-block bg-flipkart-blue text-white font-semibold px-8 py-3 rounded hover:bg-blue-600 transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        My Wishlist ({items.length} item{items.length > 1 ? 's' : ''})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col">
            <Link to={`/product/${item.product_id}`} className="relative w-full pt-[100%] bg-white">
              <img
                src={item.image_url}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
              {item.discount_percent > 0 && (
                <span className="absolute top-2 left-2 bg-flipkart-green text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {item.discount_percent}% off
                </span>
              )}
            </Link>

            <div className="p-3 flex flex-col gap-2 flex-1">
              <Link to={`/product/${item.product_id}`} className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-flipkart-blue">
                {item.name}
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold">₹{Number(item.price).toLocaleString('en-IN')}</span>
                {item.original_price > item.price && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{Number(item.original_price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 bg-flipkart-yellow text-white text-xs font-bold py-2 rounded hover:brightness-110 transition"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-2 border rounded text-xs font-medium text-gray-500 hover:bg-gray-50 transition"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
