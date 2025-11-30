import axios from 'axios';

// URL base del backend (ya incluye /api)
const API_URL = import.meta.env.VITE_API_URL || 'https://coffeflowerfull.onrender.com/api';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 20000; // 20 segundos para Render

// Crear instancia de axios
const api = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor de request
api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Interceptor de response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Error de respuesta:', error.response.status, error.response.data);
            switch (error.response.status) {
                case 404:
                    console.error('Recurso no encontrado');
                    break;
                case 500:
                    console.error('Error interno del servidor');
                    break;
                default:
                    console.error('Error en la petición');
            }
        } else if (error.request) {
            console.error('No hay respuesta del servidor');
        } else {
            console.error('Error al configurar la petición:', error.message);
        }
        return Promise.reject(error);
    }
);

// Métodos HTTP
export const get = async (url, config = {}) => {
    try {
        const response = await api.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const post = async (url, data, config = {}) => {
    try {
        const response = await api.post(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const put = async (url, data, config = {}) => {
    try {
        const response = await api.put(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patch = async (url, data, config = {}) => {
    try {
        const response = await api.patch(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const del = async (url, config = {}) => {
    try {
        const response = await api.delete(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
