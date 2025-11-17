// src/services/FaccionesService.jsx

import api from '../api/axios'; // Tu instancia de Axios configurada

const API_FACCIONES_URL = '/api/facciones'; // Endpoint que debe usar tu backend (¡confirmar con tu compañera!)

/**
 * Servicio para gestionar las operaciones CRUD de Facciones.
 */

// 1. LEER TODAS (Read All) - Requiere rol ADMIN (o la lógica que decidas)
export const getAllFacciones = async () => {
  try {
    const response = await api.get(API_FACCIONES_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener facciones:", error);
    throw error;
  }
};

// 2. CREAR (Create) - Requiere rol ADMIN
export const createFaccion = async (faccionData) => {
  try {
    const response = await api.post(API_FACCIONES_URL, faccionData);
    return response.data; 
  } catch (error) {
    console.error("Error al crear la facción:", error.response || error);
    throw new Error(error.response?.data?.message || 'Fallo al crear la facción.');
  }
};

// 3. ACTUALIZAR (Update) - Requiere rol ADMIN
export const updateFaccion = async (faccionId, faccionData) => {
  try {
    const response = await api.put(`${API_FACCIONES_URL}/${faccionId}`, faccionData);
    return response.data; 
  } catch (error) {
    console.error("Error al actualizar la facción:", error.response || error);
    throw new Error(error.response?.data?.message || 'Fallo al actualizar la facción.');
  }
};

// 4. ELIMINAR (Delete) - Requiere rol ADMIN
export const deleteFaccion = async (faccionId) => {
  try {
    const response = await api.delete(`${API_FACCIONES_URL}/${faccionId}`);
    return response.data; 
  } catch (error) {
    console.error("Error al eliminar la facción:", error.response || error);
    throw new Error(error.response?.data?.message || 'Fallo al eliminar la facción.');
  }
};