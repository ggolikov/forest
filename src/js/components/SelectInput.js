import React, { Component } from 'react';
import { FormGroup, InputGroup, Button } from 'react-bootstrap'
import InputContainer from './InputContainer';
import SelectContainer from './SelectContainer';
import { withLabel } from '../HOC';

class SelectInput extends Component {
    constructor(props) {
        super(props);
        console.log(props);

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

    render() {
        const { inputLabel, inputParam, selectLabel, selectParam, selectValues } = this.props;
        const { useSelect } = this.state;
        const inputElement = <InputContainer label={inputLabel} param={inputParam} />
        const selectElement = <SelectContainer label={selectLabel} param={selectParam} values={selectValues} />
        const buttonLabel = window._gtxt("использовать таблицу атрибутов");

        return (
            <FormGroup>
                <InputGroup>
                    { useSelect ? selectElement : inputElement}
                    <Button
                        componentClass={InputGroup.Button}
                        onClick={this.onButtonClick}
                    >
                        {buttonLabel}
                    </Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

export default withLabel(SelectInput);
