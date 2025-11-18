

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navbar from './components/organisms/Navbar.jsx';

import HomeUser from './pages/user/Home.jsx'; // Vista principal del usuario/público
import Login from './pages/auth/login.jsx';
import CreateUser from './pages/auth/create-user.jsx'; // Registro
import Products from './pages/user/Products.jsx'; // Vista de la lista de productos

import HomeAdmin from './pages/admin/HomeAdmin.jsx'; // Dashboard del Admin
import AdminProducts from './pages/admin/AdminProducts.jsx'; // CRUD de productos

// Componente para proteger rutas basado en roles
import ProtectedRoute from './utils/ProtectedRoute.jsx'; // Asumiendo que lo creas en utils

function App() {
  return (
    <BrowserRouter>
      {/* La Navbar va FUERA de Routes para que se muestre en todas las rutas */}
      <Navbar /> 
      
      <main> {/* Contenedor principal para el contenido de la página */}
        <Routes>
          {/* 1. RUTAS PÚBLICAS Y DE AUTENTICACIÓN */}
          <Route path="/" element={<HomeUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          {/* Agrega aquí otras rutas públicas (ej: /product/:id, /cart, /about) */}

          {/* 2. RUTAS PROTEGIDAS PARA ADMINISTRADOR */}
          {/* Estas rutas solo son accesibles si el usuario tiene el rol 'ADMIN' */}
          <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            {/* Agrega aquí otras rutas de administración (ej: /admin/orders, /admin/users) */}
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;