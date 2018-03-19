import React from 'react';
import { FormControl } from 'react-bootstrap';
import { BLANK_SELECT_OPTION } from '../constants';

const Select = (props) => {
    const { loading, values, placeholder, onChange } = props;
    const loadMessage = window._gtxt("Загрузка...");
    const children = loading ?
        <option value={loadMessage}>{loadMessage}</option> :
        values.map(value => {
            let key;

            if (typeof value === 'object') {
                key = value === BLANK_SELECT_OPTION ? 'blank' : value.title;
                return (
                    <option key={key} value={value.title}>{value.title}</option>
                )
            } else {
                key = value === BLANK_SELECT_OPTION ? 'blank' : value;
                return (
                    <option key={key} value={value}>{value}</option>
                )
            }
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
