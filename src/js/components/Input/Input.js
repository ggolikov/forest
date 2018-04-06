import React from 'react';
import './index.sass';

const Input = (props) => {
    const { size, placeholder, value, onChange } = props;
    const prefix = size ? `-${size}` : '';

    return (
        <input
            className={`gmx-sidebar-input${prefix}`}
            type="text"
            size={size}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

export default Input;
