import React from 'react';
import { Checkbox } from 'react-bootstrap'

const Cbox = (props) => {
    const { label, checked, onChange } = props;

    return (
        <div>
            <Checkbox checked={checked} onChange={onChange}>{label}</Checkbox>
        </div>
    );
}

export default Cbox;
