import React, { Component } from 'react';
import './index.sass';

class SqlEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChange } = this.props;

        return (
            <textarea
                onChange={onChange}
            >
            </textarea>
        );
    }
}

export default SqlEditor;
