// componentes/templates/admin/AdminLayout.jsx

import React from 'react';
// Importa tu sidebar y una barra superior si la necesitas
import AdminSidebar from '../../admin/AdminSidebar.jsx'; 
// Asume un componente de Navbar para el encabezado del admin (si lo tienes separado)
import AdminNavbar from './AdminNavbar.jsx'; 

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      
      {/* 1. Barra de Navegación Superior (Opcional) */}
      {/* <AdminNavbar /> */}

      <div className="admin-main-content">
        
        {/* 2. Menú Lateral de Navegación */}
        <AdminSidebar /> 

        {/* 3. Área de Contenido Principal (Aquí se renderizan las páginas: HomeAdmin, ProductsManagement, etc.) */}
        <main className="admin-view-area">
          {children}
        </main>
        
      </div>
      
      {/* Opcional: Footer de administración */}
    </div>
  );
};

export default AdminLayout;