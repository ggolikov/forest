import React from 'react';
import { BLANK_SELECT_OPTION } from '../../constants';
import './index.sass';

const Select = (props) => {
    const { loading, values, placeholder, onChange, size, customMappingFunc, disabled } = props;
    const loadMessage = window._gtxt("Загрузка...");
    const prefix = size ? `-${size}` : '';

    const defaultMappingFunc = (value) => {
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
    };

    const children = loading ?
        <option value={loadMessage}>{loadMessage}</option> :
        values.map(customMappingFunc || defaultMappingFunc);

    return (
        <select
            className={`gmx-sidebar-select${prefix}`}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled || loading}
        >
            {children}
        </select>
    );
}

export default Select;
