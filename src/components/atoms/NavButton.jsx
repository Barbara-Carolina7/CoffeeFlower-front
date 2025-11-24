import React from 'react';
import '../../styles/atoms/NavButton.css';

const NavButton = ({ children, onClick, isActive = false }) => {
return (
<button
className={`btn nav-button ${isActive ? 'btn-primary active' : 'btn-secondary'}`}
onClick={onClick}
type="button"
>
{children} </button>
);
};

export default NavButton;
