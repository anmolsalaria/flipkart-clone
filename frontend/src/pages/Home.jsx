/**
 * Home Page
 * ---------
 * Main product listing page with:
 *   - Category filter chips
 *   - Search (reads ?search= from URL)
 *   - Pagination
 *   - Skeleton loading state
 *   - Wishlist toggle integration
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories, fetchWishlist, addToWishlist, removeFromWishlist } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { useToast } from '../components/ToastProvider';

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  // Map product_id → wishlist row id (needed for DELETE)
  const [wishlistMap, setWishlistMap] = useState({});
  const { showToast } = useToast();

  const limit = 8;

  // Load categories once
  useEffect(() => {
    fetchCategories()
      .then(({ data }) => setCategories(data.data))
      .catch(() => {});
  }, []);

  // Load wishlist once
  useEffect(() => {
    fetchWishlist()
      .then(({ data }) => {
        const ids = new Set(data.data.map((w) => w.product_id));
        const map = {};
        data.data.forEach((w) => { map[w.product_id] = w.id; });
        setWishlistIds(ids);
        setWishlistMap(map);
      })
      .catch(() => {});
  }, []);

  // Load products when search, category, or page changes
  useEffect(() => {
    setLoading(true);
    const params = { page: pagination.page, limit };
    if (searchQuery) params.search = searchQuery;
    if (activeCategory) params.category = activeCategory;

    fetchProducts(params)
      .then(({ data }) => {
        setProducts(data.data);
        setPagination((prev) => ({
          ...prev,
          totalPages: data.pagination.totalPages,
          total: data.pagination.total,
        }));
      })
      .catch(() => showToast('Failed to load products', 'error'))
      .finally(() => setLoading(false));
  }, [searchQuery, activeCategory, pagination.page]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [searchQuery, activeCategory]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
  };

  const handleWishlistToggle = async (productId) => {
    try {
      if (wishlistIds.has(productId)) {
        const wishId = wishlistMap[productId];
        const { data } = await removeFromWishlist(wishId);
        const ids = new Set(data.data.map((w) => w.product_id));
        const map = {};
        data.data.forEach((w) => { map[w.product_id] = w.id; });
        setWishlistIds(ids);
        setWishlistMap(map);
        showToast('Removed from wishlist', 'info');
      } else {
        const { data } = await addToWishlist(productId);
        const ids = new Set(data.data.map((w) => w.product_id));
        const map = {};
        data.data.forEach((w) => { map[w.product_id] = w.id; });
        setWishlistIds(ids);
        setWishlistMap(map);
        showToast('Added to wishlist ❤️', 'success');
      }
    } catch {
      showToast('Wishlist update failed', 'error');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Category filter chips */}
      <SearchBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {searchQuery ? `Results for "${searchQuery}"` : activeCategory || 'All Products'}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({pagination.total} products)
            </span>
          </h2>
        </div>

        {/* Product grid or skeleton */}
        {loading ? (
          <SkeletonLoader count={limit} />
        ) : (
          <ProductGrid
            products={products}
            wishlistIds={wishlistIds}
            onWishlistToggle={handleWishlistToggle}
          />
        )}

        {/* Pagination controls */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 text-sm font-medium bg-white border rounded hover:bg-gray-50
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-9 h-9 text-sm font-medium rounded transition
                  ${p === pagination.page
                    ? 'bg-flipkart-blue text-white'
                    : 'bg-white border hover:bg-gray-50'}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 text-sm font-medium bg-white border rounded hover:bg-gray-50
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
