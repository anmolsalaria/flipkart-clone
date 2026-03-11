/**
 * Order Success Page
 * ------------------
 * Route: /order-success/:id
 *
 * Displays the confirmation after a successful order placement.
 * Fetches order details from the backend to show:
 *   - Order ID
 *   - Order items with images
 *   - Shipping details
 *   - Total amount
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrder } from '../services/api';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(id)
      .then(({ data }) => setOrder(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Order not found</p>
        <Link to="/" className="text-flipkart-blue font-semibold hover:underline mt-4 inline-block">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-flipkart-green rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h1>
        <p className="text-gray-500 mt-1">Your order has been confirmed</p>
      </div>

      {/* Order details card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-lg font-bold text-flipkart-blue">#{order.id}</p>
          </div>
          <span className="bg-flipkart-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {order.status}
          </span>
        </div>

        {/* Shipping info */}
        {order.shipping_name && (
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <p className="text-sm font-semibold text-gray-700 mb-1">Delivery Address</p>
            <p className="text-sm text-gray-600">{order.shipping_name}</p>
            <p className="text-sm text-gray-600">{order.shipping_address}</p>
            <p className="text-sm text-gray-600">{order.shipping_city} - {order.shipping_pincode}</p>
            <p className="text-sm text-gray-600">Phone: {order.shipping_phone}</p>
          </div>
        )}

        {/* Order items */}
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Items Ordered</h3>
        <div className="space-y-3 mb-4">
          {order.items?.map((item) => (
            <div key={item.id} className="flex gap-3 p-2 border rounded">
              <img src={item.image_url} alt={item.name} className="w-16 h-16 object-contain rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span className="text-flipkart-blue">₹{Number(order.total_amount).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6 justify-center">
        <Link
          to="/"
          className="bg-flipkart-blue text-white font-semibold px-6 py-2.5 rounded hover:bg-blue-600 transition text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
