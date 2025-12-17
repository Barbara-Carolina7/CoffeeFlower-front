import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /* ===============================
     CARGAR / GUARDAR CARRITO
  =============================== */
  useEffect(() => {
    const saved = localStorage.getItem('CoffeeFlower-cart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('CoffeeFlower-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /* ===============================
     AGREGAR AL CARRITO
  =============================== */
  const addToCart = (product) => {
    setCartItems(prev => {
      const optionsKey = JSON.stringify(product.options || {});
      const cartItemId = `${product.id}-${optionsKey}`;

      const exists = prev.find(item => item.cartItemId === cartItemId);

      if (exists) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartItemId,
          quantity: 1
        }
      ];
    });
  };

  /* ===============================
     CONTROLES
  =============================== */
  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, qty) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  /* ===============================
     🔥 ESTO ARREGLA EL HEADER
  =============================== */
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};
