// src/pages/admin/HomeAdmin.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Importa tus componentes
import Text from '../../../componetes/atoms/Text.jsx';
import Button from '../../../componetes/atoms/Button.jsx';
import Section from '../../../componetes/templates/Section.jsx'; // Para estructurar el dashboard

// Asumimos que tienes un componente Molecule para mostrar resúmenes/tarjetas de datos
// import StatsCard from '../../../compone tes/molecules/StatsCard.jsx'; 

const HomeAdmin = () => {

    // Simulación de datos rápidos para un Dashboard
    // En un proyecto real, esto se cargaría de un servicio (ej: AdminService.jsx)
    const statsData = [
        { title: 'Productos', value: '45', link: '/admin/products', icon: '☕' },
        { title: 'Facciones', value: '8', link: '/admin/facciones', icon: '⚔️' },
        { title: 'Pedidos Pendientes', value: '3', link: '/admin/orders', icon: '🛒' },
        { title: 'Nuevos Usuarios', value: '12', link: '/admin/users', icon: '👥' },
    ];

    return (
        <div className="admin-dashboard-container">
            <Text as="h1" className="dashboard-title">
                Bienvenido al Panel de Control de Coffee Flower
            </Text>
            
            <Section title="Resumen Rápido" className="stats-section">
                
                {/* 1. Muestra las estadísticas (Podrían usar la molécula DynamicTexts o una tarjeta específica) */}
                <div className="stats-grid">
                    {statsData.map((stat) => (
                        <div key={stat.title} className="stat-card">
                            <Text as="h3" className="stat-title">{stat.icon} {stat.title}</Text>
                            <Text as="p" className="stat-value">{stat.value}</Text>
                            <Link to={stat.link}>
                                <Button className="stat-button">Gestionar</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Accesos Directos a Gestión" className="quick-links-section">
                <Text as="h2">Tareas Principales</Text>
                
                {/* 2. Enlaces directos a las áreas CRUD */}
                <div className="quick-links-list">
                    <Link to="/admin/products">
                        <Button className="link-button">Gestionar Catálogo de Productos</Button>
                    </Link>
                    <Link to="/admin/facciones">
                        <Button className="link-button">Gestionar Facciones</Button>
                    </Link>
                    {/* ... Agrega más enlaces si tienes gestión de Pedidos o Usuarios ... */}
                </div>
            </Section>

            <Section title="Manuales y Soporte" className="support-section">
                <Text as="p">
                    Revisa el manual para guías detalladas sobre cada funcionalidad del sistema.
                </Text>
                <Button onClick={() => alert('Abriendo Manual de Usuario...')}>
                    Ver Manual de Usuario
                </Button>
            </Section>
        </div>
    );
};

export default HomeAdmin;