import React from 'react';
import '../../styles/atoms/Logo.css';

const Logo = () => {
const LOGO_URL = process.env.PUBLIC_URL + '/logoo.jpg'; // ruta de la imagen en public

return ( <div className="logo"> <img src={LOGO_URL} alt="Logo" className="logo-image" /> </div>
);
};

export default Logo;
