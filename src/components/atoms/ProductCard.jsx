import React, { useState } from 'react';
import Button from './Button';
import '../../styles/atoms/ProductCard.css';
import { productImages } from '../../assets/productImages';

/* =======================
   OPCIONES FIJAS
======================= */
const OPCIONES = {
  tipos_leche: [
    'Leche Entera',
    'Leche Descremada',
    'Leche Sin Lactosa',
    'Leche de Almendras',
    'Leche de Avena',
    'Leche de Soya'
  ],
  tipo_grano: [
    'Arábica',
    'Robusta',
    'Liberica'
  ],
  tamanos: [
    { nombre: 'Pequeño', extra: 0 },
    { nombre: 'Mediano', extra: 500 },
    { nombre: 'Grande', extra: 1000 }
  ],
  temperaturas: [
    'Caliente',
    'Frío',
    'Helado'
  ],
  endulzantes: [
    'Azúcar Blanca',
    'Azúcar Morena',
    'Stevia',
    'Miel',
    'Panela',
    'Eritritol'
  ]
};

/* =======================
   COMPONENTE
======================= */
const ProductCard = ({ product, onAddToCart }) => {

  const precioBase = product.price || 0;

  /* =======================
     IMÁGENES
  ======================= */
  const imageKeyMap = {
    Moka: 'moka',
    Espresso: 'espresso',
    Latte: 'latte',
    Cappuccino: 'capuchino',
    'Té Verde': 'teverde',
    'Té Negro': 'tenegro',
    'Infusión Manzanilla': 'infusionmanzanilla',
    Galletas: 'galletaschocolate',
    Brownie: 'brownies',
    Cheesecake: 'cheesecake',
    'Taza Café': 'tazadecafe',
    Cafetera: 'cafetera',
    Termo: 'termo'
  };

  const imageSrc =
    productImages[imageKeyMap[product.name]] ||
    product.image ||
    'https://via.placeholder.com/280x280?text=Sin+Imagen';

  /* =======================
     CATEGORÍAS
  ======================= */
  const esCafe = product.category === 'Café';
  const esInfusion = product.category === 'Infusiones';

  /* =======================
     ESTADO DE OPCIONES
  ======================= */
  const [seleccion, setSeleccion] = useState({
    tipo_leche: OPCIONES.tipos_leche[0],
    tipo_grano: OPCIONES.tipo_grano[0],
    tamano: OPCIONES.tamanos[0],
    temperatura: OPCIONES.temperaturas[0],
    endulzante: OPCIONES.endulzantes[0]
  });

  const cambiar = (campo, valor) => {
    setSeleccion(prev => ({ ...prev, [campo]: valor }));
  };

  const precioFinal = precioBase + (seleccion.tamano?.extra || 0);

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="product-card">

      <div className="product-image">
        <img src={imageSrc} alt={product.name} className="product-img" />
      </div>

      <div className="product-info">

        <p className="product-category">
          {product.category?.toUpperCase()}
        </p>

        <h3 className="product-name">{product.name}</h3>

        {/* PRECIO */}
        <div className="product-pricing">
          <span className="price-value">
            ${precioFinal.toLocaleString('es-CL')}
          </span>
        </div>

        {/* ===== OPCIONES CAFÉ ===== */}
        {esCafe && (
          <>
            <div className="product-option">
              <label>Tipo de leche</label>
              <select onChange={e => cambiar('tipo_leche', e.target.value)}>
                {OPCIONES.tipos_leche.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="product-option">
              <label>Tipo de grano</label>
              <select onChange={e => cambiar('tipo_grano', e.target.value)}>
                {OPCIONES.tipo_grano.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* ===== CAFÉ + INFUSIONES ===== */}
        {(esCafe || esInfusion) && (
          <>
            <div className="product-option">
              <label>Tamaño</label>
              <select
                onChange={e =>
                  cambiar(
                    'tamano',
                    OPCIONES.tamanos.find(t => t.nombre === e.target.value)
                  )
                }
              >
                {OPCIONES.tamanos.map(t => (
                  <option key={t.nombre} value={t.nombre}>
                    {t.nombre} {t.extra > 0 && `(+$${t.extra})`}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-option">
              <label>Temperatura</label>
              <select onChange={e => cambiar('temperatura', e.target.value)}>
                {OPCIONES.temperaturas.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="product-option">
              <label>Endulzante</label>
              <select onChange={e => cambiar('endulzante', e.target.value)}>
                {OPCIONES.endulzantes.map(ez => (
                  <option key={ez} value={ez}>{ez}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* BOTÓN */}
        <Button
          variant="primary"
          fullWidth
          onClick={() =>
            onAddToCart(
              product,
              {
                ...seleccion,
                precioFinal
              }
            )
          }
        >
          Agregar al Carrito
        </Button>

      </div>
    </div>
  );
};

export default ProductCard;
