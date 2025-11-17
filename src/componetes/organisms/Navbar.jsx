// src/compone tes/organisms/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate de React Router DOM

// --- Importaciones ---
// 1. Tu logo (asumiendo que está en src/assets)
import LogoImage from '../../assets/logo.jpeg'; 
// 2. Tu componente atómico Image
import Image from '../atoms/Image.jsx'; 
// 3. Tus datos de enlaces de navegación
import navbarAdminLinks from '../../data/navbarAdminLinks.js';
import navbarPublicLinks from '../../data/navbarPublicLinks.js';
// 4. Tus funciones de utilidad para autenticación y logout
import { getCurrentRole, logout } from '../../services/AuthService'; // Ajusta la ruta si es necesario (ej: ../../utils/auth.js)

const Navbar = () => {
    // Estado para guardar el rol actual del usuario
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    // Efecto para verificar el rol del usuario cuando el componente se monta
    // y cada vez que el localStorage cambie (útil después de login/logout)
    useEffect(() => {
        const role = getCurrentRole();
        setUserRole(role);

        // Opcional: Escuchar cambios en localStorage (ej: desde otra pestaña)
        const handleStorageChange = () => {
            setUserRole(getCurrentRole());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Seleccionar los enlaces de navegación según el rol
    // Si no hay rol (público) o rol de usuario, usa enlaces públicos. Si es admin, usa admin.
    const navLinks = userRole === 'ADMIN' ? navbarAdminLinks : navbarPublicLinks;

    const handleLogout = () => {
        logout(); // Llama a la función de logout
        setUserRole(null); // Limpia el rol en el estado local
        navigate('/login', { replace: true }); // Redirige al login
    };

    return (
        <header className="navbar-header">
            <div className="logo-section">
                {/* Usando el componente atómico Image para el logo */}
                <Link to="/"> {/* Hacer el logo clickeable al home */}
                    <Image 
                        src={LogoImage} 
                        alt="Logo de Coffee Flower" 
                        className="navbar-logo" 
                    />
                </Link>
            </div>
            
            <nav className="links-section">
                {/* Mapear y renderizar los enlaces */}
                {navLinks.map(link => (
                    <Link key={link.path} to={link.path} className="nav-link">
                        {link.label}
                    </Link>
                ))}

                {/* Si el usuario está logueado, mostrar el botón de Logout */}
                {userRole && (
                    <button onClick={handleLogout} className="nav-button logout-button">
                        Cerrar Sesión
                    </button>
                )}

                {/* Si no está logueado, mostrar el botón de Login */}
                {!userRole && (
                    <Link to="/login" className="nav-button login-button">
                        Iniciar Sesión
                    </Link>
                )}

                {/* Opcional: Botón de Registro si no está logueado */}
                {!userRole && (
                    <Link to="/create-user" className="nav-button register-button">
                        Registrarse
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;