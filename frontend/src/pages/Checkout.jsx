/**
 * Checkout Page
 * -------------
 * Route: /checkout
 *
 * Collects shipping information and places the order.
 *
 * Flow:
 *   1. Displays cart summary + shipping form
 *   2. On submit → POST /api/orders with shipping fields
 *   3. Backend creates order, moves cart→order_items, clears cart
 *   4. Frontend clears CartContext and navigates to /order-success/:id
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';
import { useToast } from '../components/ToastProvider';

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    shipping_name: '',
    shipping_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_pincode: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    for (const [key, val] of Object.entries(form)) {
      if (!val.trim()) {
        showToast(`Please fill in ${key.replace('shipping_', '')}`, 'error');
        return;
      }
    }

    if (cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await placeOrder(form);
      clearCart();
      showToast('Order placed successfully! 🎉', 'success');
      navigate(`/order-success/${data.data.order_id}`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Order placement failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">No items to checkout</p>
        <button onClick={() => navigate('/')} className="mt-4 text-flipkart-blue font-semibold hover:underline">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Shipping form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-base font-semibold text-flipkart-blue mb-4 flex items-center gap-2">
            <span className="bg-flipkart-blue text-white w-6 h-6 rounded-sm text-xs flex items-center justify-center">1</span>
            Delivery Address
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="shipping_name"
                value={form.shipping_name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="shipping_phone"
                value={form.shipping_phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
                placeholder="9876543210"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                name="shipping_address"
                value={form.shipping_address}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue resize-none"
                placeholder="House no, Street, Locality"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                name="shipping_city"
                value={form.shipping_city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
                placeholder="Mumbai"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
              <input
                type="text"
                name="shipping_pincode"
                value={form.shipping_pincode}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
                placeholder="400001"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-flipkart-orange text-white font-bold py-3 rounded text-sm
                       hover:brightness-110 transition disabled:opacity-50"
          >
            {submitting ? 'Placing Order...' : 'CONFIRM ORDER'}
          </button>
        </form>

        {/* Order summary sidebar */}
        <div className="bg-white rounded-lg shadow-sm p-4 h-fit sticky top-20">
          <h3 className="text-sm font-semibold text-gray-500 uppercase border-b pb-3 mb-3">
            Order Summary
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-2 text-sm">
                <img src={item.image_url} alt="" className="w-10 h-10 object-contain rounded" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-gray-700">{item.name}</p>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
