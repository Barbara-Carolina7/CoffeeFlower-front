// src/pages/user/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../services/ProductService'; // Para obtener productos destacados

// Importa tus componentes
import Text from '../../compone tes/atoms/Text.jsx';
import Button from '../../compone tes/atoms/Button.jsx';
import Section from '../../compone tes/templates/Section.jsx'; // Tu componente Template
import CardsDisplay from '../../compone tes/organisms/CardsDisplay.jsx'; // Tu organismo para la lista

const HomeUser = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFeaturedProducts = async () => {
        setLoading(true);
        try {
            // Llama a todos los productos y toma solo los primeros 3 o 4 para destacar
            const allProducts = await getAllProducts();
            setFeaturedProducts(allProducts.slice(0, 4)); 
        } catch (error) {
            console.error("Error al cargar productos destacados:", error);
            // Si falla, no es un error crítico para el Home, solo mostramos un mensaje
            setFeaturedProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeaturedProducts();
    }, []);

    const handleViewProduct = (product) => {
        // En un proyecto real, esto navegaría a /product/:id
        console.log(`Ver detalles de: ${product.name}`);
        alert(`Navegando a ${product.name}...`); 
    };

    return (
        <div className="home-page">
            
            {/* ☕ Sección 1: Banner Principal (Usando el template Section) */}
            <Section className="hero-section">
                <Text as="h1" className="hero-title">
                    Descubre el Sabor Artesanal de Coffee Flower
                </Text>
                <Text as="p" className="hero-subtitle">
                    Granos selectos, tostados a la perfección para tu mañana.
                </Text>
                <Link to="/products">
                    <Button className="hero-button">Ver Productos Ahora</Button>
                </Link>
            </Section>

            {/* 🌟 Sección 2: Productos Destacados */}
            <Section title="Productos Destacados" className="featured-products-section">
                
                <Text as="h2">Nuestra Selección Especial</Text>
                
                {loading ? (
                    <Text as="p">Cargando destacados...</Text>
                ) : featuredProducts.length > 0 ? (
                    // Reutilizamos el organismo CardsDisplay
                    <CardsDisplay 
                        items={featuredProducts} 
                        onActionClick={handleViewProduct} // Usamos un manejador de "Ver Detalles"
                    />
                ) : (
                    <Text as="p">No hay productos destacados para mostrar.</Text>
                )}
                
                <Link to="/products">
                    <Button className="view-all-button">Ver Todo el Catálogo</Button>
                </Link>
            </Section>
            
            {/* 🌿 Sección 3: Sobre Nosotros (Opcional) */}
            <Section title="Nuestra Historia" className="about-us-section">
                <Text as="h2">Pasión por el Grano</Text>
                <Text as="p">
                    En Coffee Flower, creemos que el café es más que una bebida; es una experiencia. 
                    Trabajamos directamente con agricultores para garantizar la mejor calidad desde el origen.
                </Text>
                <Link to="/about">
                    <Button className="about-button">Conoce Más</Button>
                </Link>
            </Section>

        </div>
    );
};

export default HomeUser;