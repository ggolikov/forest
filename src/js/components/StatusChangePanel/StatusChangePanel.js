import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import Button from '../Button';
import Select from '../Select';
// import { selectFeaturesWithDrawing, mapFeaturesToStore } from '../helpers';

class StatusChangePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            isLoading: false
        };
    }

    onChange = (e) => {
        const value = e.target.value;
        console.log(value);
        switch (value) {
            case window._gtxt("отчет создан"):
                this.setState({code: 0});
                break;
            case window._gtxt("имеются замечания"):
                this.setState({code: 1});
                break;
            case window._gtxt("отчет не создан"):
                this.setState({code: 2});
                break;
            default:
        }
    }

    onButtonClick = () => {
        console.log(this.state.code);
        this.setState({isLoading: true});

        setTimeout(() => {
            this.setState({isLoading: false});
        }, 2000)
    }

    render() {
        const { isLoading } = this.state;
        const valuesList = [
            window._gtxt("отчет создан"),
            window._gtxt("имеются замечания"),
            window._gtxt("отчет не создан")
        ];

        const buttonLabel = !isLoading ?
            window._gtxt("установить статус") :
             (<BeatLoader
                 color={'#70cbe0'}
                 loading={isLoading}
             />);

        return (
            <div>
                <Select
                    size={`with-addon-small`}
                    values={valuesList}
                    onChange={this.onChange}
                />
                <Button
                    disabled={isLoading}
                    className="gmx-addon-button-medium"
                    onClick={this.onButtonClick}
                >
                    {buttonLabel}
                </Button>
            </div>
        );
    }
}

export default StatusChangePanel;
