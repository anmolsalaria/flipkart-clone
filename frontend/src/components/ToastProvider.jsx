/**
 * ToastProvider
 * -------------
 * Global toast notification system using React Context.
 * Any component can call `showToast(message, type)` to display
 * a slide-in notification that auto-dismisses after 3 seconds.
 */

import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);

    // Begin exit animation, then remove
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  const bgColor = {
    success: 'bg-flipkart-green',
    error: 'bg-red-500',
    info: 'bg-flipkart-blue',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed top-right */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${bgColor[toast.type] || bgColor.success} text-white px-5 py-3 rounded-lg shadow-lg
                        text-sm font-medium min-w-[250px] ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
