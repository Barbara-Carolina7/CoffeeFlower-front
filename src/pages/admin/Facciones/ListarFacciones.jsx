
import React, { useState, useEffect } from 'react';
import { 
  getAllFacciones, 
  createFaccion, 
  updateFaccion, 
  deleteFaccion 
} from '../../../services/FaccionesService'; 

import Button from '../../../componetes/atoms/Button.jsx';
import DynamicInput from '../../../componetes/molecules/DynamicInput.jsx'; 
import Text from '../../../componetes/atoms/Text.jsx'; 

const initialFaccionState = {
  name: '',
  description: '',
};

const ListarFacciones = () => {
  const [facciones, setFacciones] = useState([]);
  const [currentFaccion, setCurrentFaccion] = useState(initialFaccionState);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadFacciones = async () => {
    setLoading(true);
    try {
      const data = await getAllFacciones();
      setFacciones(data);
      setError(null);
    } catch (err) {
      setError("No se pudieron cargar las facciones: " + (err.message || "Error de red."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaccion(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEditing) {
        await updateFaccion(currentFaccion.id, currentFaccion);
      } else {
        await createFaccion(currentFaccion);
      }
      
      setCurrentFaccion(initialFaccionState);
      setIsEditing(false);
      loadFacciones();
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  const startEdit = (faccion) => {
    setCurrentFaccion(faccion);
    setIsEditing(true);
    setError(null);
  };

  const handleDelete = async (faccionId) => {
    if (window.confirm('¿Estás seguro de eliminar esta facción?')) {
      try {
        await deleteFaccion(faccionId);
        loadFacciones();
      } catch (err) {
        setError(err.message);
      }
    }
  };


  if (loading) return <Text as="p">Cargando facciones...</Text>;

  return (
    <div className="facciones-crud-view">
      
      {error && <Text as="p" className="error-message">{error}</Text>}

      {/* --- FORMULARIO CREAR/EDITAR --- */}
      <div className="faccion-form-section">
        <Text as="h2">{isEditing ? 'Editar Facción' : 'Crear Nueva Facción'}</Text>
        <form onSubmit={handleSubmit}>
          
          <DynamicInput label="Nombre de la Facción" inputType="text" name="name" value={currentFaccion.name} onChange={handleChange} />
          <DynamicInput label="Descripción" inputType="text" name="description" value={currentFaccion.description} onChange={handleChange} />
          {/* Agrega más DynamicInput según tu modelo */}
          
          <Button type="submit">{isEditing ? 'Guardar Cambios' : 'Crear Facción'}</Button>
          {isEditing && <Button type="button" onClick={() => { setIsEditing(false); setCurrentFaccion(initialFaccionState); }}>Cancelar</Button>}
        </form>
      </div>

      {/* --- LISTA DE FACCIONES --- */}
      <div className="faccion-list-section">
        <Text as="h2">Facciones Existentes</Text>
        {facciones.length === 0 ? (
          <Text as="p">No hay facciones registradas.</Text>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {facciones.map(f => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.name}</td>
                  <td>{f.description}</td>
                  <td>
                    <Button onClick={() => startEdit(f)}>Editar</Button>
                    <Button onClick={() => handleDelete(f.id)} className="btn-danger">Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListarFacciones;