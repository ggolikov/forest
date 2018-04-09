import React from 'react';
import './index.sass';

const Checkbox = (props) => {
    const { label, checked, onChange } = props;

    return (
        <div className="gmx-checkbox-container">
            <input type="checkbox" checked={checked} onChange={onChange} />
            {label}
        </div>
    );
}

export default Checkbox;
