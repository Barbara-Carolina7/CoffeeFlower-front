import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import OrdersAdmin from './admin/OrdersAdmin';
import ProductsAdmin from './admin/ProductsAdmin';
import UsersAdmin from './admin/UsersAdmin';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="orders" element={<OrdersAdmin />} />
      <Route path="products" element={<ProductsAdmin />} />
      <Route path="users" element={<UsersAdmin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AdminRoutes;
