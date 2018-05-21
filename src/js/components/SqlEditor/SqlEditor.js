import React, { Component } from 'react';
import './index.sass';

class SqlEditor extends Component {
    constructor(props) {
        super(props);
    }

    onChange = () => {
        reactTriggerChange(this.input);
    }

    render() {
        const { size, placeholder, value, onChange } = this.props;
        const prefix = size ? `-${size}` : '';

        return (
            <textarea
                onChange={this.onChange}
            >
            </textarea>
        );
    }
}

export default SqlEditor;
