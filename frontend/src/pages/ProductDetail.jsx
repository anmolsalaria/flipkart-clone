/**
 * Product Detail Page
 * -------------------
 * Route: /product/:id
 *
 * Features:
 *   - Image carousel with thumbnail selection
 *   - Image zoom on hover (CSS transform)
 *   - Product info: title, rating, price, discount, stock status
 *   - Add to Cart / Buy Now / Wishlist buttons
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchWishlist, addToWishlist, removeFromWishlist } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ToastProvider';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistRowId, setWishlistRowId] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProductById(id), fetchWishlist()])
      .then(([prodRes, wishRes]) => {
        setProduct(prodRes.data.data);
        const wish = wishRes.data.data.find((w) => w.product_id === Number(id));
        if (wish) {
          setIsWishlisted(true);
          setWishlistRowId(wish.id);
        }
      })
      .catch(() => showToast('Failed to load product', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = async () => {
    try {
      await addItem(product.id);
      showToast(`${product.name} added to cart!`, 'success');
    } catch {
      showToast('Failed to add to cart', 'error');
    }
  };

  const handleBuyNow = async () => {
    try {
      await addItem(product.id);
      navigate('/checkout');
    } catch {
      showToast('Failed to add to cart', 'error');
    }
  };

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await removeFromWishlist(wishlistRowId);
        setIsWishlisted(false);
        setWishlistRowId(null);
        showToast('Removed from wishlist', 'info');
      } else {
        const { data } = await addToWishlist(product.id);
        const wish = data.data.find((w) => w.product_id === product.id);
        setIsWishlisted(true);
        setWishlistRowId(wish?.id);
        showToast('Added to wishlist ❤️', 'success');
      }
    } catch {
      showToast('Wishlist update failed', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="bg-gray-200 rounded-lg h-96" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="flex gap-4">
              <div className="h-12 bg-gray-200 rounded flex-1" />
              <div className="h-12 bg-gray-200 rounded flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-gray-500">Product not found</div>;
  }

  // Build images array: product.images from carousel table + fallback to main image_url
  const images = product.images?.length > 0 ? product.images : [product.image_url];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg p-6 shadow-sm">
        {/* LEFT: Image carousel */}
        <div>
          {/* Main image with zoom */}
          <div
            className="relative w-full pt-[100%] bg-white rounded-lg overflow-hidden border cursor-crosshair"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-6"
              style={
                isZoomed
                  ? {
                      transform: 'scale(2)',
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transition: 'transform 0.1s ease',
                    }
                  : { transition: 'transform 0.3s ease' }
              }
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden shrink-0 transition
                    ${idx === selectedImage ? 'border-flipkart-blue' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product info */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide">{product.category}</p>
          <h1 className="text-xl font-semibold text-gray-900">{product.name}</h1>

          {/* Rating badge */}
          <div className="flex items-center gap-2">
            <span className="bg-flipkart-green text-white text-sm font-bold px-2 py-0.5 rounded flex items-center gap-1">
              {product.rating} ★
            </span>
            <span className="text-sm text-gray-500">
              ({Math.floor(Math.random() * 10000 + 500)} ratings)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            {product.original_price > product.price && (
              <span className="text-base text-gray-400 line-through">
                ₹{Number(product.original_price).toLocaleString('en-IN')}
              </span>
            )}
            {product.discount_percent > 0 && (
              <span className="text-base text-flipkart-green font-semibold">
                {product.discount_percent}% off
              </span>
            )}
          </div>

          {/* Stock status */}
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-flipkart-green' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>

          {/* Description */}
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className="flex-1 bg-flipkart-yellow text-white font-bold py-3 rounded text-sm
                         hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🛒 ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock < 1}
              className="flex-1 bg-flipkart-orange text-white font-bold py-3 rounded text-sm
                         hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⚡ BUY NOW
            </button>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlistToggle}
            className="mt-2 flex items-center justify-center gap-2 py-2.5 border rounded text-sm font-medium
                       hover:bg-gray-50 transition"
          >
            {isWishlisted ? (
              <span className="text-red-500">❤️ WISHLISTED</span>
            ) : (
              <span className="text-gray-600">🤍 ADD TO WISHLIST</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
