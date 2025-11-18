// src/pages/auth/create-user.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/AuthService.jsx'; 

// Importa tus componentes
import DynamicInput from '../../componetes/molecules/DynamicInput.jsx'; 
import Button from '../../componetes/atoms/Button.jsx'; 
import Text from '../../componetes/atoms/Text.jsx'; 

const initialUserState = {
  username: '',
  email: '',
  password: '',
  // Dependiendo de tu backend, podrías necesitar confirmar la contraseña
  confirmPassword: '' 
};

const CreateUser = () => {
  const [userData, setUserData] = useState(initialUserState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // 1. Validación básica del Frontend
    if (userData.password !== userData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // 2. Llamada al servicio de registro (solo envía datos necesarios)
      const { confirmPassword, ...dataToSend } = userData; // Excluye confirmPassword
      await registerUser(dataToSend);
      
      setSuccess(true);
      setError(null);
      setUserData(initialUserState); // Limpiar formulario

      // Opcional: Redirigir al login después de un breve momento
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <Text as="h1">Crear Cuenta - Coffee Flower</Text>
      
      <form onSubmit={handleSubmit} className="register-form">
        
        <DynamicInput 
          label="Nombre de Usuario" inputType="text" name="username" 
          value={userData.username} onChange={handleChange} 
          placeholder="Define tu nombre de usuario" 
        />

        <DynamicInput 
          label="Correo Electrónico" inputType="email" name="email" 
          value={userData.email} onChange={handleChange} 
          placeholder="tu.correo@ejemplo.com" 
        />
        
        <DynamicInput 
          label="Contraseña" inputType="password" name="password" 
          value={userData.password} onChange={handleChange} 
          placeholder="Mínimo 8 caracteres" 
        />
        
        <DynamicInput 
          label="Confirmar Contraseña" inputType="password" name="confirmPassword" 
          value={userData.confirmPassword} onChange={handleChange} 
          placeholder="Repite la contraseña" 
          // Muestra error si no coinciden
          error={userData.password !== userData.confirmPassword && userData.confirmPassword ? 'Las contraseñas no coinciden' : ''}
        />

        {error && <Text as="p" className="error-message">{error}</Text>}
        {success && <Text as="p" className="success-message">¡Cuenta creada con éxito! Serás redirigido al Login.</Text>}
        
        <Button type="submit">Registrarse</Button>
      </form>
      
      <div className="login-link">
        <Text>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión aquí</Link></Text>
      </div>
    </div>
  );
};

export default CreateUser;