// src/pages/auth/login.jsx (Versión Optimizada)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/AuthService';
import { getCurrentRole } from '../../utils/auth'; 

// Importa tus componentes
import DynamicInput from '../../compone tes/molecules/DynamicInput.jsx'; // 👈 Usamos la molécula
import Button from '../../compone tes/atoms/Button.jsx'; 

const Login = () => {
  // Usamos un solo objeto para manejar las credenciales
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función única para manejar el cambio en cualquier campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Usamos el objeto credentials directamente
      await login(credentials); 
      
      const role = getCurrentRole(); 

      if (role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (err) {
      // Captura el error lanzado desde AuthService
      setError(err.message); 
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        
        {/* 1. Campo de Usuario/Email usando DynamicInput */}
        <DynamicInput 
          label="Usuario o Email" // Etiqueta visible
          inputType="text" 
          name="username" 
          placeholder="Escribe tu usuario o email" 
          value={credentials.username} 
          onChange={handleChange} 
        />
        
        {/* 2. Campo de Contraseña usando DynamicInput */}
        <DynamicInput 
          label="Contraseña" // Etiqueta visible
          inputType="password" 
          name="password" 
          placeholder="Ingresa tu clave" 
          value={credentials.password} 
          onChange={handleChange} 
        />

        {error && <p className="error-message">{error}</p>}
        
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
};

export default Login;