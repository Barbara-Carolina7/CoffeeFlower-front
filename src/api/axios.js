import axios from "axios";

// Configuración de Axios para conectarse al backend
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://tu-backend.onrender.com/api"
});

// Agrega automáticamente el token JWT si existe
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
