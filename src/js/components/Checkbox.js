import React from 'react';
import { Checkbox } from 'react-bootstrap'

const Cbox = (props) => {
    const { label, onChange } = props;

    return (
        <div>
            <Checkbox onChange={onChange}>{label}</Checkbox>
        </div>
    );
}

export default Cbox;
