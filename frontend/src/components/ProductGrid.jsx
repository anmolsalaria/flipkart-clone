/**
 * ProductGrid Component
 * ---------------------
 * Responsive grid that renders ProductCard components.
 * Uses Tailwind's responsive grid: 1 col (mobile), 2 (sm), 3 (md), 4 (lg).
 */

import ProductCard from './ProductCard';

export default function ProductGrid({ products, wishlistIds, onWishlistToggle }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No products found</p>
        <p className="text-gray-400 text-sm mt-1">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlistIds.has(product.id)}
          onWishlistToggle={onWishlistToggle}
        />
      ))}
    </div>
  );
}
