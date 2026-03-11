/**
 * Cart Page
 * ---------
 * Route: /cart
 *
 * Displays all cart items with quantity controls, subtotal,
 * and a "Place Order" CTA that navigates to /checkout.
 */

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cartItems, subtotal, loading } = useCart();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-1 mb-6">Add items to it now!</p>
        <Link
          to="/"
          className="inline-block bg-flipkart-blue text-white font-semibold px-8 py-3 rounded hover:bg-blue-600 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        My Cart ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart items list */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Price summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 h-fit sticky top-20">
          <h3 className="text-sm font-semibold text-gray-500 uppercase border-b pb-3 mb-3">
            Price Details
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-flipkart-green">
              <span>Discount</span>
              <span>− ₹{cartItems
                .reduce((sum, i) => sum + (i.original_price - i.price) * i.quantity, 0)
                .toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-flipkart-green font-medium">FREE</span>
            </div>
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-base">
            <span>Total Amount</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center mt-4 bg-flipkart-orange text-white font-bold py-3 rounded text-sm
                       hover:brightness-110 transition"
          >
            PLACE ORDER
          </Link>
        </div>
      </div>
    </div>
  );
}
