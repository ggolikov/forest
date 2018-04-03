import React, { Component } from 'react';
import Button from '../Button';
import InputContainer from '../Input';
import SelectContainer from '../Select';
import { withLabel } from '../../HOC';

class SelectInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            useSelect: false
        }
    }

    onButtonClick = () => {
        const { useSelect } = this.state;
        this.setState({
            useSelect: !useSelect
        });
    }

    onInputChosen: () => {
        // return this.input.value;
    }

    onSelectChosen: () => {
        // return this.select.value;
    }

    render() {
        const { param, selectValues, loading } = this.props;
        const { useSelect } = this.state;
        const inputElement =
            <InputContainer
                // ref={(input) => {this.input = input}}
                onInputChosen={this.onInputChosen}
                param={param}

            />
        const selectElement =
            <SelectContainer
                // ref={(input) => {this.select = select}}
                onSelectChosen={this.onSelectChosen}
                param={param}
                values={selectValues}
                loading={loading}
                loadAttributes={true}
            />

        return (
            <div>
                <div>
                    { useSelect ? selectElement : inputElement}
                    <Button
                        active={useSelect}
                        onClick={this.onButtonClick}
                    >
                    </Button>
                </div>
            </div>
        );
    }
}

export default withLabel(SelectInput);
