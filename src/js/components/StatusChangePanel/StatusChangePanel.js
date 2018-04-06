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
