// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/atoms/ProductCard';
import { getAllProducts, getCategories } from '../services/productService';
import { useCart } from '../context/CartContext';
import '../styles/pages/Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['Todas']);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const categoryParam = searchParams.get('categoria');
  const searchTerm = searchParams.get('buscar') || '';

  /* =============================
     CARGAR CATEGORÍAS
  ============================== */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(['Todas', ...data.map(c => c.name)]);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    loadCategories();
  }, []);

  /* =============================
     DETECTAR CATEGORÍA URL
  ============================== */
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  /* =============================
     CARGAR PRODUCTOS
  ============================== */
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  /* =============================
     FILTRAR PRODUCTOS
  ============================== */
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description &&
          p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  /* =============================
     AGREGAR AL CARRITO
  ============================== */
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      image: product.image // ✅ ya viene del backend
    });
  };

  return (
    <div className="products-page">
      <div className="products-container">

        {/* SIDEBAR */}
        <aside className="filters-sidebar">
          <h3>Categorías</h3>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-button ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* LISTADO */}
        <main className="products-main">
          <div className="products-header">
            <h1>
              {searchTerm
                ? `Resultados para "${searchTerm}"`
                : selectedCategory === 'Todas'
                ? 'Todos los Productos'
                : selectedCategory}
            </h1>

            <p className="products-count">
              {filteredProducts.length} producto
              {filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loading ? (
            <div className="loading">Cargando productos...</div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No se encontraron productos.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
