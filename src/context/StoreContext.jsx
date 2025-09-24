import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEYS = {
  cart: 'azu_cart',
  favourites: 'azu_favourites',
};

const StoreContext = createContext(null);

function parsePriceToNumber(priceLike) {
  if (typeof priceLike === 'number') return priceLike;
  if (typeof priceLike !== 'string') return 0;
  const cleaned = priceLike.replace(/[^0-9.]/g, '');
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.cart);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.favourites);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favourites, JSON.stringify(favourites));
  }, [favourites]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const qty = Math.max(1, Number(quantity) || 1);
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: parsePriceToNumber(product.price),
          quantity: qty,
          slug: product.slug,
        },
      ];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    const qty = Math.max(1, Number(newQuantity) || 1);
    setCartItems((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity: qty } : p)));
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const isFavourite = (productId) => favourites.some((f) => f.id === productId);

  const toggleFavourite = (product) => {
    if (!product) return;
    setFavourites((prev) => {
      const exists = prev.some((f) => f.id === product.id);
      if (exists) return prev.filter((f) => f.id !== product.id);
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          specs: product.specs,
          slug: product.slug,
        },
      ];
    });
  };

  const value = useMemo(
    () => ({
      cartItems,
      favourites,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleFavourite,
      isFavourite,
      cartCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),
      favouritesCount: favourites.length,
      cartTotal: cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    [cartItems, favourites]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}


