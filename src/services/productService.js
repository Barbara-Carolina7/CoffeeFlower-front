// src/services/productService.js
import { get, post, put, del } from './api';
import imageService from './imageService';
import axios from 'axios';

// Para hacer requests directos sin usar ./api
const getNoApi = async (url) => {
  try {
    const response = await axios.get(`https://coffeflowerfull.onrender.com${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mapear producto desde backend a frontend
const mapProductFromBackend = (producto) => ({
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
  fabricationType: producto.tipoFabricacion?.nombre || '',

  // ✅ Arrays de opciones para selects
  milkTypes: producto.tiposLeche || [],
  grainTypes: producto.tiposGrano || [],
  sizes: producto.tamanos || [],
  temperatures: producto.temperaturas || []
});

// Mapear producto de frontend a backend
const mapProductToBackend = (product) => ({
  nombre: product.name,
  descripcion: product.description || '',
  precioBase: Number(product.price),
  stock: Number(product.stock),
  requiereReceta: product.requiresPrescription || false,
  categoria: product.categoryId ? { id: Number(product.categoryId) } : null,
  laboratorio: product.laboratoryId ? { id: Number(product.laboratoryId) } : null,
  imagenes: []
});

// Agregar imagen a producto
const addImageToProduct = async (productId, imageUrl) => {
  if (!imageUrl) return false;
  try {
    await post('/imagenes', { url: imageUrl, producto: { id: productId } });
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

  const backendProduct = mapProductToBackend(productData);
  const newProduct = await post('/productos', backendProduct);

  if (imageUrl) await addImageToProduct(newProduct.id, imageUrl);

  return mapProductFromBackend({ ...newProduct, imagenes: imageUrl ? [{ url: imageUrl }] : [] });
};

export const updateProduct = async (id, productData, file = null) => {
  let imageUrl = null;
  if (file) imageUrl = await imageService.uploadProductImage(file);

  const backendProduct = mapProductToBackend(productData);
  const updatedProduct = await put(`/productos/${id}`, backendProduct);

  if (imageUrl) await addImageToProduct(id, imageUrl);

  return mapProductFromBackend({ ...updatedProduct, imagenes: imageUrl ? [{ url: imageUrl }] : [] });
};

export const getAllProducts = async () => {
  try {
    const productos = await get('/productos');
    return productos.map(mapProductFromBackend);
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
  return categorias.map(c => ({ id: c.id, name: c.nombre }));
};

export const getLaboratories = async () => {
  const labs = await getNoApi('/marcas');
  return labs.map(l => ({ id: l.id, name: l.nombre }));
};

export const deleteProduct = async (id) => {
  try {
    await del(`/productos/${id}`);
    return true;
  } catch (error) {
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
  deleteProduct
};
