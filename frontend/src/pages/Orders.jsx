/**
 * Orders Page
 * -----------
 * Route: /orders
 *
 * Displays all orders placed by the user with:
 *   - Order ID
 *   - Total amount
 *   - Order date
 *   - Expandable item details (fetched on click)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserOrders, fetchOrder } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [detailLoading, setDetailLoading] = useState(null);

  useEffect(() => {
    fetchUserOrders()
      .then(({ data }) => setOrders(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      return;
    }

    setExpandedOrderId(orderId);

    if (orderDetails[orderId]) return;

    setDetailLoading(orderId);
    try {
      const { data } = await fetchOrder(orderId);
      setOrderDetails((prev) => ({ ...prev, [orderId]: data.data }));
    } catch {
      setExpandedOrderId(null);
    } finally {
      setDetailLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-xl font-semibold text-gray-700">No orders placed yet.</h2>
        <p className="text-gray-500 mt-1 mb-6">Looks like you haven't placed any orders!</p>
        <Link
          to="/"
          className="inline-block bg-flipkart-blue text-white font-semibold px-8 py-3 rounded hover:bg-blue-600 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        My Orders ({orders.length})
      </h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          const detail = orderDetails[order.id];
          const isLoading = detailLoading === order.id;

          return (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => handleToggle(order.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-lg font-bold text-flipkart-blue">#{order.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-lg font-bold">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t">
                  {isLoading ? (
                    <div className="space-y-3 pt-3 animate-pulse">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex gap-3 p-2">
                          <div className="w-16 h-16 bg-gray-200 rounded" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : detail?.items?.length > 0 ? (
                    <div className="space-y-3 pt-3">
                      <h3 className="text-sm font-semibold text-gray-700">Items Ordered</h3>
                      {detail.items.map((item) => (
                        <div key={item.product_id} className="flex gap-3 p-2 border rounded">
                          <img src={item.image_url} alt={item.name} className="w-16 h-16 object-contain rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 pt-3">No items found for this order.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
