import axios from 'axios';
import imageService from './imageService';

// 🔗 URL base del backend
const BASE_URL = 'https://coffeflowerfull-backend.onrender.com/api';

/* =====================================================
   FUNCIÓN AUXILIAR GET
===================================================== */
const getNoApi = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error en getNoApi:', error);
    throw error;
  }
};

/* =====================================================
   MAPEAR PRODUCTO: BACKEND → FRONTEND
===================================================== */
const mapProductFromBackend = (producto) => ({
  id: producto.id,
  name: producto.nombre,
  description: producto.descripcion,
  price: producto.precioBase,
  stock: producto.stock,
  category: producto.categoria?.nombre || 'Sin categoría',
  categoryId: producto.categoria?.id || null,

  // 👇 IMAGEN (MUY IMPORTANTE)
  image:
    producto.imagenUrl ||
    producto.imagenes?.[0]?.url ||
    'https://via.placeholder.com/300?text=Sin+Imagen'
});

/* =====================================================
   MAPEAR PRODUCTO: FRONTEND → BACKEND
===================================================== */
const mapProductToBackend = (product) => ({
  nombre: product.name,
  descripcion: product.description || '',
  precioBase: Number(product.price),
  stock: Number(product.stock),
  categoria: product.categoryId ? { id: Number(product.categoryId) } : null,
  imagenUrl: product.image || null
});

/* =====================================================
   CRUD PRODUCTOS
===================================================== */
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
    console.error('Error al obtener producto:', error);
    return null;
  }
};

export const createProduct = async (productData, file = null) => {
  let imageUrl = productData.image || null;

  if (file) {
    imageUrl = await imageService.uploadProductImage(file);
  }

  const backendProduct = mapProductToBackend({
    ...productData,
    image: imageUrl
  });

  const response = await axios.post(`${BASE_URL}/productos`, backendProduct);
  return mapProductFromBackend(response.data);
};

export const updateProduct = async (id, productData, file = null) => {
  let imageUrl = productData.image || null;

  if (file) {
    imageUrl = await imageService.uploadProductImage(file);
  }

  const backendProduct = mapProductToBackend({
    ...productData,
    image: imageUrl
  });

  const response = await axios.put(
    `${BASE_URL}/productos/${id}`,
    backendProduct
  );

  return mapProductFromBackend(response.data);
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

/* =====================================================
   CATEGORÍAS
===================================================== */
export const getCategories = async () => {
  try {
    const categorias = await getNoApi('/categorias');
    return categorias.map(c => ({
      id: c.id,
      name: c.nombre
    }));
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
};
