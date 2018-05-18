import React, { Component } from 'react';
import Button from '../Button';
import { InputContainer } from '../containers';
import { SelectContainer } from '../containers';
import { withLabel } from '../../HOC';

class SelectInput extends Component {
    constructor(props) {
        const { param, selectValues, loading } = props;

        super(props);

        this.state = {
            useSelect: false
        }

        this.inputElement =
            <InputContainer
                size='with-addon'
                param={param}

            />

        this.selectElement =
            <SelectContainer
                size='with-addon'
                param={param}
                values={selectValues}
                loading={loading}
                loadAttributes={true}
            />
    }

    onButtonClick = () => {
        const { useSelect } = this.state;

        // console.log(this.selectElement);
        // console.log(this.inputElement);

        // useSelect ? this.inputElement.change() : this.selectElement.change();

        this.setState({
            useSelect: !useSelect
        });
    }

    render() {
        const { useSelect } = this.state;

        return (
            <div>
                <div>
                    { useSelect ? this.selectElement : this.inputElement}
                    <Button
                        className={ useSelect ? "gmx-addon-button-toggled" : "gmx-addon-button"}
                        title={window._gtxt("выбрать из таблицы атрибутов")}
                        onClick={this.onButtonClick}
                    >
                    </Button>
                </div>
            </div>
        );
    }
}

export default withLabel(SelectInput);
