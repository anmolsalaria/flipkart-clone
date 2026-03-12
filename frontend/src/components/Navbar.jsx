/**
 * Navbar Component
 * ----------------
 * Flipkart-style blue navigation bar with:
 *   - Logo / brand name
 *   - Search bar (fires search on parent via callback)
 *   - Cart icon with live item counter badge
 *   - Wishlist link
 *
 * The cart count comes from CartContext so it updates in real-time.
 */

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-flipkart-blue sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-4 flex-wrap md:flex-nowrap">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start shrink-0">
          <span className="text-white text-xl font-bold italic tracking-wide">Flipkart</span>
          <span className="text-[10px] text-yellow-300 -mt-1 italic">
            Explore <span className="text-yellow-200 font-semibold">Plus</span> ✦
          </span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px] max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full py-2 pl-4 pr-12 rounded-sm text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 text-flipkart-blue hover:text-blue-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Nav links */}
        <div className="flex items-center gap-5 ml-auto">
          {/* Wishlist */}
          <Link to="/wishlist" className="text-white text-sm font-medium flex items-center gap-1 hover:opacity-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">Wishlist</span>
          </Link>

          {/* Orders */}
          <Link to="/orders" className="text-white text-sm font-medium flex items-center gap-1 hover:opacity-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="hidden sm:inline">Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-white text-sm font-medium flex items-center gap-1 hover:opacity-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-flipkart-yellow text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
