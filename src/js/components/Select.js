import React from 'react';
import { FormControl } from 'react-bootstrap'

const Select = (props) => {
    const { loading, values, placeholder, onChange } = props;
    const loadMessage = window._gtxt("Загрузка...");
    const children = loading ?
        <option value={loadMessage}>{loadMessage}</option> :
        values.map(value => {
            return (
                <option key={value} value={value}>{value}</option>
            )
        });

    return (
        <FormControl
            componentClass="select"
            placeholder={placeholder}
            onChange={onChange}
            disabled={loading}
        >
            {children}
        </FormControl>
    );
}

export default Select;
