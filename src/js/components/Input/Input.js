import React, { Component } from 'react';
import reactTriggerChange from 'react-trigger-change';
import './index.sass';

class Input extends Component {
    constructor(props) {
        super(props);
    }

    change() {
        reactTriggerChange(this.input);
    }

    render() {
        const { size, placeholder, value, onChange } = this.props;
        const prefix = size ? `-${size}` : '';

        return (
            <input
                ref={input => { this.input = input; }}
                className={`gmx-sidebar-input${prefix}`}
                type="text"
                size={size}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        );
    }
}

export default Input;
