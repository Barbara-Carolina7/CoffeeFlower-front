// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import PrivateRoute from './components/molecules/PrivateRoute';
import { publicRoutes, adminRoutes } from './routes/config';
import './App.css';

function App() {
return ( <Router> <AuthProvider> <CartProvider> <div className="App"> <Header />


        <main className="app-main">
          <Routes>
            {/* Rutas públicas */}
            {publicRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}

            {/* Rutas de admin protegidas */}
            {adminRoutes.map(({ path, element: Element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute requiredRole="admin">
                    <Element />
                  </PrivateRoute>
                }
              />
            ))}

            {/* Ruta fallback: 404 */}
            <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '4rem' }}>Página no encontrada</h2>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>
  </AuthProvider>
</Router>


);
}

export default App;
