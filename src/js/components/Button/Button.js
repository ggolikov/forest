import React from 'react';
import './index.sass';

const Button = (props) => {
    const { className, onClick, disabled, title, children } = props;
    return (
        <button
            className={className}
            onClick={onClick}
            title={title}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
