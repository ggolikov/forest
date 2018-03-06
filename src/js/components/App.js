import React, { Component } from 'react';
import InputContainer from './InputContainer';
import CheckboxContainer from './CheckboxContainer';
import SourceTab from './SourceTab';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStyleIndex: 0,
            attrs: []
        };
    }

    render() {
        return (
            <div>
                <h2>Введите координаты</h2>

            </div>
        );
    }
}
export default App;
