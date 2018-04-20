import React, { Component } from 'react';
import Button from '../Button';
import { collectParams, makeReport } from '../../helpers';
import './index.sass';

class MakeReportButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        const { features } = this.props;
        let reportParams = collectParams(features);
        console.log(reportParams);
        makeReport(reportParams);
    }

    render() {
        return (
            <div className="gmx-button-container">
                <Button
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
