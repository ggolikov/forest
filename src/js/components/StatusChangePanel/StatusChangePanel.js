import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatusChangeButton from './StatusChangeButton';
import Select from '../Select';
import { BLANK_SELECT_OPTION } from '../../constants';


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

        switch (value) {
            case BLANK_SELECT_OPTION:
                this.setState({code: null});
                break;
            case window._gtxt("отчет создан"):
                this.setState({code: 2});
                break;
            case window._gtxt("имеются замечания"):
                this.setState({code: 1});
                break;
            case window._gtxt("отчет не создан"):
                this.setState({code: 0});
                break;
            default:
        }
    }

    customMappingFunc = (value) => {
        let key = value === BLANK_SELECT_OPTION ? 'blank' : value,
            prefix;

        switch (value) {
            case BLANK_SELECT_OPTION:
                break;
            case window._gtxt("отчет создан"):
                prefix = '-good';
                break;
            case window._gtxt("имеются замечания"):
                prefix = '-mean';
                break;
            case window._gtxt("отчет не создан"):
                prefix = '-bad';
                break;
            default:
                prefix = '-bad';
        }

        let indicatorClassName = `gmx-status-indicator${prefix}`

        return (
            <option key={key} value={value}>
                <div className={indicatorClassName}></div>
                {value}
            </option>
        )
    }

    toggleLoading = (bool) => {
        this.setState({isLoading: bool});
    }

    render() {
        const { layerId } = this.props;
        const { isLoading, code } = this.state;
        const valuesList = [
            BLANK_SELECT_OPTION,
            window._gtxt("отчет создан"),
            window._gtxt("имеются замечания"),
            window._gtxt("отчет не создан")
        ];

        return (
            <div>
                <Select
                    size={`with-addon-small`}
                    values={valuesList}
                    onChange={this.onChange}
                    customMappingFunc={this.customMappingFunc}
                />
                <StatusChangeButton
                    layerId={layerId}
                    isLoading={isLoading}
                    code={code}
                    toggleLoading={this.toggleLoading}
                />
            </div>
        );
    }
}

export default StatusChangePanel;
