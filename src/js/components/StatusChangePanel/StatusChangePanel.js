import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import Button from '../Button';
import Select from '../Select';
import { STATUS_COLUMN_NAME, BLANK_SELECT_OPTION } from '../../constants';
import { updateObjects } from '../../helpers';

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
            case BLANK_SELECT_OPTION:
                this.setState({code: null});
                break;
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
        const FIELD = 'PLSVYD';
        const { layerId } = this.props;
        const { code } = this.state;
        const state = window.store.getState();
        const { featuresIds } = state;
        const selectedFeatures = featuresIds
            .map(item => {
                return {
                    id: item.id,
                    selected: item.selected
                }
            })
            .filter(item => item.selected)
            .map(item => {
                return {
                    action: "update",
                    id: item.id,
                    properties: {
                        [FIELD]: code
                    }
                }
            });

        console.log(selectedFeatures);
        console.log(code);
        this.setState({isLoading: true});

        updateObjects(layerId, selectedFeatures)
            .then(res => {
                console.log(res);
            });

        setTimeout(() => {
            this.setState({isLoading: false});
        }, 2000)
    }

    render() {
        const { isLoading } = this.state;
        const valuesList = [
            BLANK_SELECT_OPTION,
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
