/**
 * CartItem Component
 * ------------------
 * Renders a single cart item row with quantity controls and remove button.
 */

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './ToastProvider';

export default function CartItem({ item }) {
  const { updateItem, removeItem } = useCart();
  const { showToast } = useToast();

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1) return;
    try {
      await updateItem(item.id, newQty);
    } catch {
      showToast('Failed to update quantity', 'error');
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(item.id);
      showToast(`${item.name} removed from cart`, 'info');
    } catch {
      showToast('Failed to remove item', 'error');
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white border-b last:border-b-0">
      {/* Product image */}
      <Link to={`/product/${item.product_id}`} className="shrink-0">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-24 h-24 object-contain rounded"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.product_id}`} className="text-sm font-medium text-gray-800 hover:text-flipkart-blue line-clamp-2">
          {item.name}
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold">₹{Number(item.price).toLocaleString('en-IN')}</span>
          {item.original_price > item.price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{Number(item.original_price).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-flipkart-green font-semibold">
                {item.discount_percent}% off
              </span>
            </>
          )}
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold
                       disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold border rounded px-1 py-0.5">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold
                       hover:bg-gray-100 transition"
          >
            +
          </button>

          <button
            onClick={handleRemove}
            className="ml-4 text-sm font-semibold text-flipkart-blue hover:underline"
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right shrink-0">
        <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}
