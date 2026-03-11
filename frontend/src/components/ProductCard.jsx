/**
 * ProductCard Component
 * ---------------------
 * Renders a single product in the grid layout, mimicking Flipkart's card style.
 *
 * Features:
 *   - Discount badge (green)
 *   - Image hover zoom effect via CSS transform
 *   - Star rating display
 *   - Strikethrough original price
 *   - Wishlist heart icon
 *   - Add to Cart button
 */

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './ToastProvider';
import WishlistButton from './WishlistButton';

export default function ProductCard({ product, isWishlisted, onWishlistToggle }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addItem(product.id);
      showToast(`${product.name} added to cart!`, 'success');
    } catch {
      showToast('Failed to add to cart', 'error');
    }
  };

  // Render filled stars based on rating (out of 5)
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(<span key={i} className="text-flipkart-yellow">★</span>);
      } else if (i === full && half) {
        stars.push(<span key={i} className="text-flipkart-yellow">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100"
    >
      {/* Image container with hover zoom */}
      <div className="relative w-full pt-[100%] bg-white overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount badge */}
        {product.discount_percent > 0 && (
          <span className="absolute top-2 left-2 bg-flipkart-green text-white text-[11px] font-bold px-2 py-0.5 rounded">
            {product.discount_percent}% off
          </span>
        )}

        {/* Wishlist button */}
        <div className="absolute top-2 right-2 bg-white rounded-full shadow">
          <WishlistButton isWishlisted={isWishlisted} onToggle={() => onWishlistToggle(product.id)} />
        </div>
      </div>

      {/* Info section */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="bg-flipkart-green text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating} ★
          </span>
          <span className="text-xs text-gray-500">({Math.floor(Math.random() * 5000 + 100)})</span>
        </div>

        {/* Price section */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          <span className="text-base font-bold text-gray-900">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
          {product.original_price > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{Number(product.original_price).toLocaleString('en-IN')}
            </span>
          )}
          {product.discount_percent > 0 && (
            <span className="text-xs text-flipkart-green font-semibold">
              {product.discount_percent}% off
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-flipkart-yellow text-white text-sm font-semibold py-2 rounded hover:brightness-110 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
