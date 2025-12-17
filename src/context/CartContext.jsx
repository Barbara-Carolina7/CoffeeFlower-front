import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('CoffeFlower-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('CoffeFlower-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const id = `${product.id}-${JSON.stringify(product.opciones)}`;

      const existente = prev.find(item => item.cartItemId === id);

      if (existente) {
        return prev.map(item =>
          item.cartItemId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartItemId: id,
          quantity: 1
        }
      ];
    });
  };

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

  const getTotalItems = () =>
    cartItems.reduce((t, i) => t + i.quantity, 0);

  const getTotalPrice = () =>
    cartItems.reduce((t, i) => t + (i.precioFinal * i.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
