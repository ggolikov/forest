import React from 'react';
import './index.sass';

const Button = (props) => {
    const { className, onClick, disabled, children } = props;
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
