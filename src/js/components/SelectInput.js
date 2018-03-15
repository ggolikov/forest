import React, { Component } from 'react';
import { FormGroup, InputGroup, Button } from 'react-bootstrap'
import InputContainer from './InputContainer';
import SelectContainer from './SelectContainer';
import { withLabel } from '../HOC';

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

    render() {
        const { param, selectValues, loading } = this.props;
        const { useSelect } = this.state;
        const inputElement = <InputContainer param={param} />
        const selectElement = <SelectContainer param={param} values={selectValues} loading={loading} />
        const buttonLabel = window._gtxt("использовать таблицу атрибутов");

        return (
            <FormGroup>
                <InputGroup>
                    { useSelect ? selectElement : inputElement}
                    <Button
                        active={useSelect}
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
