import React from 'react';

const Checkbox = (props) => {
    const { label, checked, onChange } = props;

    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChange} />
            {label}
        </div>
    );
}

export default Checkbox;