import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import Button from '../Button';
import { collectParams, makeReport } from '../../helpers';
import './index.sass';

class MakeReportButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    toggleLoading = (bool) => {
        this.toggleLoading(true);
        this.setState({isLoading: bool});
    }

    onClick = () => {
        const { features } = this.props;
        let reportParams = collectParams(features);
        console.log(reportParams);
        makeReport(reportParams)
            .then(res => {
                this.toggleLoading(false);
            });
    }

    render() {
        const { isLoading } = this.state;

        let buttonLabel = isLoading ?
           <BeatLoader
               color={'#70cbe0'}
               loading={isLoading}
           /> : this.props.children;

        return (
            <div className="gmx-button-container">
                <Button
                    disabled={isLoading}
                    className="gmx-sidebar-button"
                    onClick={this.onClick}
                >
                    {this.props.children}
                </Button>
            </div>
        );
    }
}

export default MakeReportButton;
