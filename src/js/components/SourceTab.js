import React, { Component } from 'react';
import { Tabs, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
// import Input from './Input';
import DrawingButton from './DrawingButton';
import AddButton from './AddButton';
import PointsList from './PointsList';

class SourceTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
          key: 1
        };
    }

    handleSelect = (key) => {
        console.log(`selected ${key}`);
        this.setState({ key });
    }

    render() {
        return (
            <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="source-tab"
            >
                <Tab eventKey={1} title="вручную">
                    <AddButton />
                    <PointsList />
                </Tab>
                <Tab eventKey={2} title="по карте">
                    <PointsList />
                </Tab>
            </Tabs>
        );
    }
}

export default SourceTab;
