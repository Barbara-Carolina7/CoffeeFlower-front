
import api from '../api/axios';

const API_AUTH_URL = '/auth'; // Endpoint base para la autenticación

export const login = async (credentials) => {
  try {
    const response = await api.post(`${API_AUTH_URL}/login`, credentials); 
    const { token, role } = response.data;
    if (token && role) {
      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', role);
    }
    return response.data;
  } catch (error) {
    console.error("Error durante el login:", error.response || error);
    throw new Error(error.response?.data?.message || 'Credenciales inválidas o error de conexión.');
  }
};

/**
 * Registra  nuevo usuario en el sistema.
 * @param {object} userData 
 */

export const registerUser = async (userData) => {
  try {
    // El backend de Spring Boot debe tener un endpoint como /auth/register
    const response = await api.post(`${API_AUTH_URL}/register`, userData); 
    return response.data; // Devuelve un mensaje de éxito o los datos del nuevo usuario
  } catch (error) {
    console.error("Error durante el registro:", error.response || error);
    // Asume que el backend devuelve un error 400 si el email/usuario ya existe
    throw new Error(error.response?.data?.message || 'Fallo al registrar el usuario.');
  }
};

export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userRole');
};