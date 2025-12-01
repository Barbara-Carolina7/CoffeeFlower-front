// src/services/imageService.js
import axios from 'axios';

const API_KEY = 'TU_API_KEY_DE_IMGBB'; // Reemplaza con tu clave si usas ImgBB
const API_URL = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

const imageService = {
  uploadProductImage: async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(API_URL, formData);
      return response.data.data.url; // Retorna la URL de la imagen subida
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw new Error('No se pudo subir la imagen');
    }
  }
};

export default imageService;
