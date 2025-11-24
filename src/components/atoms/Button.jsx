import React from 'react';
import '../../styles/atoms/Button.css';

const Button = ({
children,
onClick,
variant = 'primary',
type = 'button',
disabled = false,
fullWidth = false,
className = '',
ariaLabel
}) => {
return (
<button
className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`}
onClick={onClick}
type={type}
disabled={disabled}
aria-label={ariaLabel}
>
{children} </button>
);
};

export default Button;
