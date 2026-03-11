/**
 * SkeletonLoader Component
 * ------------------------
 * Placeholder shimmer cards shown while products are loading.
 * Mimics the shape of ProductCard for a smooth perceived-performance boost.
 */

export default function SkeletonLoader({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          {/* Image placeholder */}
          <div className="w-full pt-[100%] bg-gray-200 relative" />

          {/* Text placeholders */}
          <div className="p-3 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-5 bg-gray-200 rounded w-20" />
              <div className="h-5 bg-gray-200 rounded w-16" />
            </div>
            <div className="h-9 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
