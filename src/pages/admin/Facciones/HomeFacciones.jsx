// src/pages/user/Home.jsx
import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import CreateModal from '../../../components/organisms/CreateModal';
import Button from '../../../components/atoms/Button';
import { homeData } from './data/homeData';
import FaccionesService from '../../../services/FaccionesService';
import { generarMensaje } from '../../../utils/GenerarMensaje';

const createInputs = [
  { name: "nombre", type: "text", placeholder: "Nombre", required: true },
  { name: "descripcion", type: "textarea", placeholder: "Descripción", required: true, className: "h-28" },
  { name: "logo", type: "file" },
];

function Home() {
    const [pageData, setPageData] = useState(homeData);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingFaccion, setEditingFaccion] = useState(null);
 
    useEffect(() => {
        const loadData = async () => {
            const updatedData = [...pageData];
            const tableItem = updatedData.find(i => i.service === "facciones");

            if (tableItem) {
                try {
                    setLoading(true);
                    const data = await FaccionesService.getAllFacciones();
                    const dataWithActions = data.map(faccion => ({
                        ...faccion,
                        onEdit: () => handleOpenEdit(faccion),
                        onDelete: () => handleDelete(faccion.id),
                    }));
                    tableItem.data = dataWithActions;
                } catch (error) {
                    generarMensaje('No se pudieron cargar las facciones', 'warning');
                    tableItem.data = [{ id: "Error", nombre: "No se pudieron cargar", descripcion: "Revisa tu conexión" }];
                } finally {
                    setLoading(false);
                }
            }
            setPageData(updatedData);
        };

        loadData();
    }, []);

    const handleOpenEdit = (faccion) => {
        setEditingFaccion(faccion);
        setIsModalOpen(true);
    };

    const handleCreate = async (formData) => {
        setSubmitLoading(true);
        try {
            if (editingFaccion) {
                await FaccionesService.updateFaccion(editingFaccion.id, formData);
                generarMensaje('¡Facción actualizada con éxito!', 'success');
            } else {
                await FaccionesService.createFaccion(formData);
                generarMensaje('¡Facción creada con éxito!', 'success');
            }
            const data = await FaccionesService.getAllFacciones();
            const dataWithActions = data.map(faccion => ({
                ...faccion,
                onEdit: () => handleOpenEdit(faccion),
                onDelete: () => handleDelete(faccion.id),
            }));

            const updatedData = [...pageData];
            const tableItem = updatedData.find(i => i.service === "facciones");
            tableItem.data = dataWithActions;
            setPageData(updatedData);

            setIsModalOpen(false);
            setEditingFaccion(null);
        } catch (error) {
            generarMensaje('Error al guardar la facción', 'warning');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta facción?')) return;

        try {
            await FaccionesService.deleteFaccion(id);
            generarMensaje('¡Facción eliminada con éxito!', 'success');

            const data = await FaccionesService.getAllFacciones();
            const dataWithActions = data.map(faccion => ({
                ...faccion,
                onEdit: () => handleOpenEdit(faccion),
                onDelete: () => handleDelete(faccion.id),
            }));

            const updatedData = [...pageData];
            const tableItem = updatedData.find(i => i.service === "facciones");
            tableItem.data = dataWithActions;
            setPageData(updatedData);
        } catch (error) {
            generarMensaje('Error al eliminar la facción', 'warning');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}

            <div className="container py-6 flex justify-end">
                <Button
                    text="Crear Facción"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md active:scale-95 transition-all"
                />
            </div>

            <Section content={pageData} className="container" />

            <CreateModal
                isOpen={isModalOpen}
                onClose={() => {
                setIsModalOpen(false);
                setEditingFaccion(null);
                }}
                onSubmit={handleCreate}
                inputsConfig={createInputs}
                title={editingFaccion ? "Editar Facción" : "Crear Nueva Facción"}
                submitText={editingFaccion ? "Actualizar" : "Crear"}
                loading={submitLoading}
                initialData={editingFaccion || {}}
            />
        </div>
    );
}

export default Home;