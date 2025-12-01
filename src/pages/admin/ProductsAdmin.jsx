import React, { useState, useEffect } from 'react';
import Table from '../../components/molecules/Table';
import Modal from '../../components/molecules/Modal';
import DynamicForm from '../../components/molecules/DynamicForm';
import Button from '../../components/atoms/Button';
import productService from '../../services/productService';
import imageService from '../../services/imageService';

import '../../styles/pages/Admin.css';

const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setDataLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                productService.getAllProducts(),
                productService.getCategories()
            ]);

            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            alert('Error al cargar datos del servidor');
        } finally {
            setDataLoading(false);
        }
    };

    // Configuración de campos del formulario
    const formFields = [
        {
            name: 'name',
            label: 'Nombre del Producto',
            type: 'text',
            required: true,
            placeholder: 'Ej: cafe moka'
        },
        {
            name: 'categoryId',
            label: 'Categoría',
            type: 'select',
            required: true,
            options: categories.map(cat => ({
                value: cat.id,
                label: cat.name
            }))
        },
        {
            name: 'price',
            label: 'Precio',
            type: 'number',
            required: true,
            min: 0,
            placeholder: '0'
        },
        {
            name: 'stock',
            label: 'Stock',
            type: 'number',
            required: true,
            min: 0,
            placeholder: '0'
        },
        {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            rows: 4,
            placeholder: 'Descripción del producto...'
        },
        {
            name: 'image',
            label: 'Imagen del Producto',
            type: 'file',
            accept: 'image/*'
        }
    ];

    const handleCreate = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        const product = products.find(p => p.id === row[0]);
        if (product) {
            setEditingProduct({
                ...product,
                imagePreview: product.image
            });
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (row) => {
        const productId = row[0];
        const productName = row[1];

        if (window.confirm(`¿Estás seguro de eliminar "${productName}"?`)) {
            try {
                await productService.deleteProduct(productId);
                setProducts(products.filter(p => p.id !== productId));
                alert('Producto eliminado exitosamente');
            } catch (error) {
                alert('Error al eliminar producto: ' + error.message);
            }
        }
    };

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            let imageUrl = editingProduct?.image || '';

            if (formData.image instanceof File) {
                try {
                    imageUrl = await imageService.uploadProductImage(formData.image);
                } catch (error) {
                    alert('Error al subir imagen: ' + error.message);
                    setIsLoading(false);
                    return;
                }
            }

            if (!formData.categoryId) {
                alert('La categoría es obligatoria');
                setIsLoading(false);
                return;
            }

            const productData = {
                name: formData.name,
                categoryId: formData.categoryId ? Number(formData.categoryId) : null,
                price: Number(formData.price),
                stock: Number(formData.stock),
                description: formData.description || '',
            };

            if (editingProduct) {
                const updatedProduct = await productService.updateProduct(
                    editingProduct.id,
                    productData,
                    imageUrl
                );
                setProducts(products.map(p =>
                    p.id === editingProduct.id ? updatedProduct : p
                ));
                alert('Producto actualizado exitosamente');
            } else {
                const newProduct = await productService.createProduct(
                    productData,
                    imageUrl
                );
                setProducts([...products, newProduct]);
                alert('Producto creado exitosamente');
            }

            setIsModalOpen(false);
            setEditingProduct(null);
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Preparar datos para la tabla (ordenados por ID)
    const tableData = [...products]
        .sort((a, b) => a.id - b.id)
        .map(p => [
            p.id,
            p.name,
            p.category,
            `$${p.price?.toLocaleString() || 0}`,
            p.stock
        ]);

    if (dataLoading) {
        return (
            <div className="admin-page">
                <div className="admin-header">
                    <h1>Gestión de Productos</h1>
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    Cargando productos...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Gestión de Productos</h1>
                <Button onClick={handleCreate}>
                    🛒 Agregar Producto
                </Button>
            </div>

            <Table
                columns={['ID', 'Nombre', 'Categoría', 'Precio', 'Stock']}
                data={tableData}
                actions={{
                    edit: handleEdit,
                    delete: handleDelete
                }}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => !isLoading && setIsModalOpen(false)}
                title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                size="large"
            >
                <DynamicForm
                    fields={formFields}
                    initialValues={editingProduct || {}}
                    onSubmit={handleSubmit}
                    onCancel={() => !isLoading && setIsModalOpen(false)}
                    submitText={isLoading ? 'Guardando...' : 'Guardar Producto'}
                />
            </Modal>
        </div>
    );
};

export default ProductsAdmin;
