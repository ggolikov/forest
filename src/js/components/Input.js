import React from 'react';
import { FormControl } from 'react-bootstrap'

const Input = (props) => {
    return (
        <FormControl
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
        />
    );
}

export default Input;
