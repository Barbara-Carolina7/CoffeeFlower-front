import { get, post, put, del } from './api.js';
import ImageService from './imageService.js';
import axios from 'axios';

// --- Helpers internos ---

// Llamadas sin "/api" para rutas externas
const getNoApi = async (url) => {
  try {
    const response = await axios.get(`https://coffeflowerfull.onrender.com${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mapear de backend a frontend
const mapProductFromBackend = (producto) => {
  if (!producto) return null;
  return {
    id: producto.id || 0,
    name: producto.nombre || '',
    description: producto.descripcion || '',
    price: producto.precioBase || 0,
    stock: producto.stock || 0,
    category: producto.categoria?.nombre || 'Sin categoría',
    image: producto.imagenes?.[0]?.url || 'https://via.placeholder.com/300',
    brand: producto.laboratorio?.nombre || '',
    requiresPrescription: producto.requiereReceta || false,
    categoryId: producto.categoria?.id || null,
    laboratoryId: producto.laboratorio?.id || null,
    fabricationType: producto.tipoFabricacion?.nombre || ''
  };
};

// Mapear de frontend a backend
const mapProductToBackend = (product) => {
  const categoryId = Number(product.categoryId);
  const laboratoryId = Number(product.laboratoryId);

  return {
    nombre: product.name,
    descripcion: product.description || '',
    precioBase: Number(product.price),
    stock: Number(product.stock),
    requiereReceta: product.requiresPrescription || false,
    categoria: (categoryId && !isNaN(categoryId)) ? { id: categoryId } : null,
    laboratorio: (laboratoryId && !isNaN(laboratoryId)) ? { id: laboratoryId } : null,
    imagenes: []
  };
};

// Asociar imagen al producto en backend
const addImageToProduct = async (productId, imageUrl) => {
  try {
    if (!imageUrl) return false;
    const imageData = { url: imageUrl, producto: { id: productId } };
    await post('/imagenes', imageData);
    return true;
  } catch (error) {
    console.error('Error al asociar imagen al producto:', error);
    return false;
  }
};

// --- Funciones principales ---

export const createProduct = async (productData, file = null) => {
  try {
    let imageUrl = null;
    if (file) {
      imageUrl = await ImageService.uploadProductImage(file);
    }
    const backendProduct = mapProductToBackend(productData);
    const newProduct = await post('/productos', backendProduct);
    if (imageUrl) await addImageToProduct(newProduct.id, imageUrl);
    return mapProductFromBackend({ ...newProduct, imagenes: imageUrl ? [{ url: imageUrl }] : [] });
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData, file = null) => {
  try {
    let imageUrl = null;
    if (file) {
      imageUrl = await ImageService.uploadProductImage(file);
    }
    const backendProduct = mapProductToBackend(productData);
    const updatedProduct = await put(`/productos/${id}`, backendProduct);
    if (imageUrl) await addImageToProduct(id, imageUrl);
    return mapProductFromBackend({ ...updatedProduct, imagenes: imageUrl ? [{ url: imageUrl }] : [] });
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error);
    throw error;
  }
};

// --- Funciones de consulta ---

export const getAllProducts = async () => {
  try {
    const productos = await get('/productos');
    return productos.map(mapProductFromBackend).filter(Boolean);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  const producto = await get(`/productos/${id}`);
  return mapProductFromBackend(producto);
};

export const getCategories = async () => {
  const categorias = await getNoApi('/categorias');
  return categorias.map(cat => ({ id: cat.id, name: cat.nombre }));
};

export const getLaboratories = async () => {
  const labs = await getNoApi('/marcas');
  return labs.map(lab => ({ id: lab.id, name: lab.nombre }));
};

export const getFeaturedProducts = async () => {
  const allProducts = await getAllProducts();
  return allProducts.slice(0, 6);
};

export const deleteProduct = async (id) => {
  try {
    await del(`/productos/${id}`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
    throw error;
  }
};

export default {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  getCategories,
  getLaboratories,
  getFeaturedProducts,
  deleteProduct
};
