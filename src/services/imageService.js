// ImageService.js
// Servicio simple para "subir" imágenes de productos
// Por ahora devuelve una URL de prueba

export const uploadProductImage = async (file) => {
  if (!file) return null;
  // Aquí podrías integrar Cloudinary, S3 u otro servicio real
  // Por ahora devolvemos la URL de placeholder
  return 'https://via.placeholder.com/300';
};

export default { uploadProductImage };
