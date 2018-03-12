import React from 'react';
import { FormControl } from 'react-bootstrap'

const Select = (props) => {
    const loadMessage = window._gtxt("Загрузка...");
    const children = props.loading ?
        <option value={loadMessage}>{loadMessage}</option> :
        props.values.map(value => {
            return (
                <option key={value} value={value}>{value}</option>
            )
        });

    return (
        <FormControl
            componentClass="select"
            placeholder={props.placeholder}
            onChange={props.onChange}
        >
            {children}
        </FormControl>
    );
}

export default Select;
