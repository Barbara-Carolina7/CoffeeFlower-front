import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/atoms/Button';
import { FaCoffee } from 'react-icons/fa';
import '../styles/pages/Auth.css';

const Login = () => {
const navigate = useNavigate();
const { login } = useAuth();
const [formData, setFormData] = useState({ email: '', password: '' });
const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
};

const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'El email es requerido';
    else if (!formData.email.endsWith('@gmail.com')) newErrors.email = 'Solo se aceptan correos @gmail.com';
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) newErrors.email = 'Email inválido. Use el formato correo@gmail.com';

    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const nombre = formData.email.split('@')[0];
        const rol = formData.email === 'admin@gmail.com' ? 'admin' : 'usuario';
        const userData = { nombre, email: formData.email, rol };
        login(userData);
        setTimeout(() => navigate(rol === 'admin' ? '/admin' : '/'), 1000);
    }
};

return (
    <div className="auth-page">
        <div className="auth-container">
            <div className="auth-header">
                {/* Logo CoffeeFlower */}
                <Link to="/" className="login-logo">
                    <span className="logo-icon"><FaCoffee /></span>
                    <span className="logo-text">CoffeeFlower</span>
                </Link>
                <p>Inicia sesión en tu cuenta</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="tucorreo@gmail.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="••••••••"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-links">
                    <Link to="/recuperar-password" className="link-secondary">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <Button type="submit" fullWidth>
                    Iniciar Sesión
                </Button>
            </form>

            <div className="auth-footer">
                <p>
                    ¿No tienes cuenta?{' '}
                    <Link to="/registro" className="link-primary">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    </div>
);


};

export default Login;
