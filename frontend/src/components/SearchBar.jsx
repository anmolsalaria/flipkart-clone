/**
 * SearchBar Component
 * -------------------
 * Inline category filter chips displayed below the navbar on the Home page.
 * Clicking a chip filters products by that category.
 */

export default function SearchBar({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => onCategoryChange('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${!activeCategory
              ? 'bg-flipkart-blue text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeCategory === cat
                ? 'bg-flipkart-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
