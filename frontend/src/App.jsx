/**
 * App Component — Root Layout & Routing
 * --------------------------------------
 * Wraps everything in providers (Cart, Toast) and defines routes.
 *
 * Route structure:
 *   /                    → Home (product listing)
 *   /product/:id         → Product detail
 *   /cart                → Shopping cart
 *   /checkout            → Checkout / shipping form
 *   /order-success/:id   → Order confirmation
 *   /wishlist            → Wishlist page
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ToastProvider from './components/ToastProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <div className="min-h-screen bg-flipkart-light">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success/:id" element={<OrderSuccess />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </main>
          </div>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
