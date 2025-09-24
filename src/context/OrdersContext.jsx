import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'azu_orders';

const OrdersContext = createContext(null);

function generateOrderId() {
  return 'ord_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-6);
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = ({ items, totals, shippingAddress, paymentMethod }) => {
    const id = generateOrderId();
    const now = new Date().toISOString();
    const order = {
      id,
      createdAt: now,
      items,
      totals, // { itemsTotal, shipping, tax, grandTotal }
      shippingAddress, // { address, city, postalCode, country }
      paymentMethod, // string
      status: { paid: true, delivered: false },
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);

  const value = useMemo(() => ({ orders, createOrder, getOrderById }), [orders]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}


