import axios from 'axios';
import imageService from './imageService';

// 🛑 NOTA: Cámbialo a http://localhost:8080/api si estás probando local
const BASE_URL = 'https://coffeflowerfull-backend.onrender.com/api';

const getNoApi = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error en getNoApi:', error);
    throw error;
  }
};

// --- MAPEADOR: BACKEND -> FRONTEND ---
const mapProductFromBackend = (producto) => ({
  id: producto.id || 0,
  name: producto.nombre || '',
  description: producto.descripcion || '',
  price: producto.precioBase || 0, // Usamos precioBase del modelo Java
  stock: producto.stock || 0,
  category: producto.categoria?.nombre || 'Sin categoría',
  categoryId: producto.categoria?.id || null,
  image: producto.imagenUrl || producto.imagenes?.[0]?.url || 'https://via.placeholder.com/300',
  
  // 🛑 NUEVOS CAMPOS DE LÓGICA 🛑
  requiresMilk: producto.requiereLeche || false,
  allowsSweetener: producto.permiteEndulzante || false,
  isIceCream: producto.esHelado || false,

  // Relaciones
  toppings: producto.toppings || [],
  labels: producto.etiquetas || []
});

// --- MAPEADOR: FRONTEND -> BACKEND ---
const mapProductToBackend = (product) => ({
  nombre: product.name,
  descripcion: product.description || '',
  precioBase: Number(product.price),
  stock: Number(product.stock),
  imagenUrl: product.image,
  categoria: product.categoryId ? { id: Number(product.categoryId) } : null,
  
  // 🛑 ENVIAR NUEVOS CAMPOS AL BACKEND 🛑
  requiereLeche: product.requiresMilk || false,
  permiteEndulzante: product.allowsSweetener || false,
  esHelado: product.isIceCream || false
});

const addImageToProduct = async (productId, imageUrl) => {
  if (!imageUrl) return false;
  try {
    await axios.post(`${BASE_URL}/imagenes`, { url: imageUrl, producto: { id: productId } });
    return true;
  } catch (error) {
    console.error('Error al asociar imagen:', error);
    return false;
  }
};

// --- Funciones CRUD ---
export const createProduct = async (productData, file = null) => {
  let imageUrl = null;
  if (file) imageUrl = await imageService.uploadProductImage(file);

  const backendProduct = mapProductToBackend({ ...productData, image: imageUrl });
  const response = await axios.post(`${BASE_URL}/productos`, backendProduct);

  return mapProductFromBackend(response.data);
};

export const updateProduct = async (id, productData, file = null) => {
  let imageUrl = null;
  if (file) imageUrl = await imageService.uploadProductImage(file);

  const backendProduct = mapProductToBackend({ ...productData, image: imageUrl || productData.image });
  const response = await axios.put(`${BASE_URL}/productos/${id}`, backendProduct);

  return mapProductFromBackend(response.data);
};

export const getAllProducts = async () => {
  try {
    const productos = await getNoApi('/productos');
    return productos.map(mapProductFromBackend);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const producto = await getNoApi(`/productos/${id}`);
    return mapProductFromBackend(producto);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const categorias = await getNoApi('/categorias');
    return categorias.map(c => ({ id: c.id, name: c.nombre }));
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/productos/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return false;
  }
};

export default {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  getCategories,
  deleteProduct
};