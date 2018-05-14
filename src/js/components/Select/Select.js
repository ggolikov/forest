import React, { Component } from 'react';
import reactTriggerChange from 'react-trigger-change';
import { BLANK_SELECT_OPTION } from '../../constants';
import './index.sass';

class Select extends Component {
    constructor(props) {
        super(props);
    }

    change() {
        reactTriggerChange(this.select);
    }

    render() {
        const { loading, values, placeholder, onChange, size, customMappingFunc, disabled } = this.props;
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
                ref={input => { this.select = input; }}
                className={`gmx-sidebar-select${prefix}`}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled || loading}
            >
                {children}
            </select>
        );
    }

}

export default Select;
