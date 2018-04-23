import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import Button from '../Button';
import { collectParams, makeReport } from '../../helpers';
import './index.sass';

class MakeReportButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: false
        }
    }

    onClick = () => {
        this.setState({
            isLoading: true,
            error: false
        });

        const { features } = this.props;
        let reportParams = collectParams(features);
        console.log(reportParams);
        makeReport(reportParams)
            .then(res => {
                this.setState({
                    isLoading: false,
                    error: false
                });
            })
            .catch(res => {
                this.setState({
                    isLoading: false,
                    error: true
                });
            });
    }

    render() {
        const { isLoading, error } = this.state;

        let buttonLabel;

        if (isLoading) {
            buttonLabel =
                (<BeatLoader
                    color={'#70cbe0'}
                    loading={isLoading}
                 />)
        } else if (error) {
            buttonLabel = 'ошибка';
        } else {
            buttonLabel = this.props.children;
        }

        return (
            <div className="gmx-button-container">
                <Button
                    disabled={isLoading}
                    className={`gmx-sidebar-button${error ? '-error' : ''}`}
                    onClick={this.onClick}
                >
                    {buttonLabel}
                </Button>
            </div>
        );
    }
}

export default MakeReportButton;
