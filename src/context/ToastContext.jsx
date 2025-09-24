import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = nextId++;
    const item = {
      id,
      title: toast.title || '',
      description: toast.description || '',
      variant: toast.variant || 'default',
      duration: toast.duration ?? 2500,
      action: toast.action || null,
    };
    setToasts((prev) => [...prev, item]);
    if (item.duration > 0) {
      setTimeout(() => removeToast(id), item.duration);
    }
    return id;
  }, [removeToast]);

  const value = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Viewport */}
      <div className="fixed top-4 right-4 z-[1000] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[220px] max-w-xs rounded-md shadow-md border px-3 py-2 bg-white ${
              t.variant === 'success' ? 'border-green-300' : t.variant === 'error' ? 'border-red-300' : 'border-gray-200'
            }`}
          >
            {t.title && <div className="text-sm font-semibold text-gray-900">{t.title}</div>}
            {t.description && <div className="text-xs text-gray-700 mt-0.5">{t.description}</div>}
            {t.action && (
              <div className="mt-2">
                <button
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  onClick={() => {
                    try { t.action.onClick?.(); } finally { removeToast(t.id); }
                  }}
                >
                  {t.action.label || 'Action'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}


