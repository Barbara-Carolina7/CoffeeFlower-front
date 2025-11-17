// src/services/ProductService.jsx

import api from '../api/axios'; // Importa tu instancia de Axios configurada

const API_PRODUCTOS_URL = '/api/products'; // El endpoint base que debe usar el backend

/**
 * Servicio para gestionar las operaciones CRUD de Productos.
 */

// 1. LEER TODOS (Read All)
export const getAllProducts = async () => {
  try {
    // Petición GET: Normalmente pública (para el home y la lista de usuario)
    const response = await api.get(API_PRODUCTOS_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// 2. CREAR (Create) - Requiere rol ADMIN
export const createProduct = async (productData) => {
  try {
    // Petición POST: La cabecera JWT se añade automáticamente por el interceptor de axios
    const response = await api.post(API_PRODUCTOS_URL, productData);
    return response.data; // Devuelve el producto creado
  } catch (error) {
    console.error("Error al crear el producto:", error.response || error);
    throw new Error(error.response?.data?.message || 'Fallo al crear el producto. ¿Rol Admin?');
  }
};

// 3. ACTUALIZAR (Update) - Requiere rol ADMIN
export const updateProduct = async (productId, productData) => {
  try {
    // Petición PUT
    const response = await api.put(`${API_PRODUCTOS_URL}/${productId}`, productData);
    return response.data; // Devuelve el producto actualizado
  } catch (error) {
    console.error("Error al actualizar el producto:", error.response || error);
    throw new Error(error.response?.data?.message || 'Fallo al actualizar el producto.');
  }
};

// 4. ELIMINAR (Delete) - Requiere rol ADMIN
export const deleteProduct = async (productId) => {
  try {
    // Petición DELETE
    const response = await api.delete(`${API_PRODUCTOS_URL}/${productId}`);
    return response.data; // Normalmente vacío o mensaje de éxito
  } catch (error) {
    console.error("Error al eliminar el producto:", error.response || error);
    throw new Error(error.response?.data?.message || 'Fallo al eliminar el producto.');
  }
};