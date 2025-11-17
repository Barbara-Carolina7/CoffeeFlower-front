// src/data/navbarPublicLinks.js

const navbarPublicLinks = [
    { 
        path: '/', 
        label: 'Inicio' 
    },
    { 
        path: '/products', 
        label: 'Productos' 
    },
    { 
        path: '/cart', 
        label: 'Carrito' 
    },
    { 
        path: '/my-orders', 
        label: 'Mis Compras' // Solo visible si hay token, pero la ruta es pública
    },
    { 
        path: '/about', 
        label: 'Nosotros' 
    },
];

export default navbarPublicLinks;