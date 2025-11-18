// src/pages/user/Products.jsx

import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/ProductService.jsx'; 
import Text from '../../compone tes/atoms/Text.jsx'; 
import CardsDisplay from '../../compone tes/organisms/CardsDisplay.jsx'; // Tu organismo para mostrar tarjetas

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función placeholder para añadir al carrito
    const handleAddToCart = (product) => {
        // Lógica futura: Guardar el producto en el estado global o en localStorage para el carrito
        console.log(`Producto añadido al carrito: ${product.name}`);
        alert(`¡${product.name} añadido al carrito!`); 
        // Aquí se llamaría a un servicio de carrito (CartService.jsx)
    };

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts(); // Llama al Backend (endpoint público)
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error("Error al cargar productos:", err);
            setError("No pudimos cargar los productos en este momento. Intenta más tarde.");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // --- Renderizado de Estado ---
    if (loading) {
        return <div className="products-loading"><Text as="h2">Cargando la selección de Coffee Flower...</Text></div>;
    }

    if (error) {
        return <div className="products-error"><Text as="h2" className="error-message">{error}</Text></div>;
    }

    if (products.length === 0) {
        return <div className="products-empty"><Text as="h2">¡Volveremos pronto! No hay productos disponibles.</Text></div>;
    }

    return (
        <div className="products-page">
            <Text as="h1" className="page-title">Nuestra Selección de Café</Text>
            
            {/* ☕ Pasa la lista de productos y el manejador de click al organismo */}
            <CardsDisplay 
                items={products} 
                onActionClick={handleAddToCart} 
            />
        </div>
    );
};

export default Products;