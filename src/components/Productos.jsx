// ... importaciones existentes ...
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importamos Axios

// --- Componente Productos Modificado ---
const Productos = () => {
    // 1. Hook para guardar la lista de productos
    const [productos, setProductos] = useState([]);
    // 2. Hook para manejar el estado de carga
    const [cargando, setCargando] = useState(true);

    // 3. Hook de efecto para hacer la petición al montar el componente
    useEffect(() => {
        // Asegúrate de cambiar esta URL por la dirección real de tu backend
        const URL_BACKEND = 'http://localhost:3000/api/productos'; 

        axios.get(URL_BACKEND)
            .then(response => {
                // Si la petición es exitosa, guardamos los datos
                setProductos(response.data); 
                setCargando(false);
            })
            .catch(error => {
                // Manejo de errores
                console.error("Hubo un error al obtener los productos:", error);
                setCargando(false);
            });
    }, []); // El array vacío [] asegura que solo se ejecute una vez (al montar)

    if (cargando) {
        return <div style={styles.section}><h2 style={styles.h2}>Cargando productos... ⏳</h2></div>;
    }

    return (
        <div style={styles.section}>
            <h2 style={styles.h2}>Nuestros Productos ☕</h2>
            {/* 4. Mapeamos la lista para mostrar los productos */}
            <div style={styles.productosGrid}>
                {productos.length > 0 ? (
                    productos.map(producto => (
                        <div key={producto.id} style={styles.productoCard}>
                            <h3>{producto.nombre}</h3>
                            <p>${producto.precio}</p>
                            <button>Agregar al carrito</button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
};

// Asegúrate de agregar los nuevos estilos al objeto 'styles'
const newStyles = {
    // ... otros estilos ...
    productosGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
    },
    productoCard: {
        border: '1px solid #ddd',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
};

// ... Asegúrate de integrar newStyles en tu objeto styles principal ...
// (O simplemente úsalos directamente si no quieres modificar el objeto styles principal)