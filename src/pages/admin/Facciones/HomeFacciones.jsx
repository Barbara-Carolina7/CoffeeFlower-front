// src/pages/admin/Facciones/HomeFacciones.jsx

import React from 'react';
import Text from '../../../componetes/atoms/Text.jsx';
import ListarFacciones from './ListarFacciones.jsx'; // Componente que hará el CRUD

const HomeFacciones = () => {
  return (
    <div className="home-facciones-container">
      <Text as="h1" className="admin-title">Panel de Administración de Facciones</Text>
      
      {/* Aquí cargamos la lógica de CRUD */}
      <ListarFacciones />
    </div>
  );
};

export default HomeFacciones;