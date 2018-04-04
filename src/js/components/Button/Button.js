import React from 'react';
import './index.sass';

const Button = (props) => {
    const { className, onClick, children } = props;
    return (
        <button
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
