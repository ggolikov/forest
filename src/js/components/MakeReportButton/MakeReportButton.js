import React, { Component } from 'react';
import Button from '../Button';
import { makeReport } from '../../helpers';
import './index.sass';

class MakeReportButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {

    }

    render() {
        const { features } = this.props;
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
