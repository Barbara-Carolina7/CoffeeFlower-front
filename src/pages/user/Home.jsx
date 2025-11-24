import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductosService from '../../services/ProductosService.jsx';

const ProductosList = () => {
    
    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = () => {
        ProductosService.getAllProductos()
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.log('Error obteniendo productos:', error);
            });
    };

    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold mb-5 text-center">
                Lista de Productos – CoffeFlower ☕🌸
            </h2>

            <div className="bg-orange-400 text-white p-5 text-center font-bold text-xl rounded-lg mb-5">
                Productos Disponibles en Nuestra Cafetería
            </div>

            <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-3">Nombre</th>
                        <th className="border p-3">Precio</th>
                        <th className="border p-3">Descripción</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.length > 0 ? (
                        productos.map(prod => (
                            <tr key={prod.id}>
                                <td className="border p-3">{prod.nombre}</td>
                                <td className="border p-3">${prod.precio}</td>
                                <td className="border p-3">{prod.descripcion}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No hay productos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductosList;
