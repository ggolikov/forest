import React from 'react';
import './index.sass';

const Button = (props) => {
    let { className, onClick, disabled, title, children } = props;

    className = disabled ? `${className}-disabled` : className;

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
