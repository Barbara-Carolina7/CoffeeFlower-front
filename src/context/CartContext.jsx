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

    // AGREGAR PRODUCTO (Modificado para personalización)
    const addToCart = (product, personalizacion = {}) => {
        setCartItems(prevItems => {
            // Creamos un identificador único que incluya las opciones elegidas
            // Esto evita que un café con leche de almendras se sume a uno con leche entera
            const cartItemId = `${product.id}-${personalizacion.leche || ''}-${personalizacion.endulzante || ''}-${personalizacion.extra || ''}`;

            const existingItem = prevItems.find(item => item.cartItemId === cartItemId);

            if (existingItem) {
                return prevItems.map(item =>
                    item.cartItemId === cartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { 
                    ...product, 
                    cartItemId, // ID único para el carrito
                    lecheSeleccionada: personalizacion.leche || null,
                    endulzanteSeleccionado: personalizacion.endulzante || null,
                    extraSeleccionado: personalizacion.extra || null,
                    quantity: 1 
                }];
            }
        });
    };

    // Eliminar producto (Usando el nuevo cartItemId)
    const removeFromCart = (cartItemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    };

    // Actualizar cantidad (Usando el nuevo cartItemId)
    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.cartItemId === cartItemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
            return total + (price * item.quantity);
        }, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};