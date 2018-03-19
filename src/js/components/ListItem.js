import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';
import { zoomToFeature } from '../helpers';
import { changeFeatureSelection } from '../AC';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    onItemClick = (e) => {
        const { layerId, id, idField } = this.props;

        zoomToFeature(layerId, id, idField)
    }

    onMouseEnter = (e) => {
        this.setState({
            active: true
        });
    }

    onMouseLeave = (e) => {
        this.setState({
            active: false
        });
    }

    render() {
        const { selected, txt, onItemSelect } = this.props;
        const { active } = this.state;

        const className = active ? "gmx-list-item active": "gmx-list-item";

        return (
            <div className={className}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <div className={"feature-list-item-part feature-list-item-part-left"}>
                    <Checkbox checked={selected} onChange={onItemSelect}></Checkbox>
                </div>
                <div className={"feature-list-item-part feature-list-item-part-right"} onClick={this.onItemClick}>
                    {txt}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;

    return {
        onItemSelect: (e) => {
            dispatch(changeFeatureSelection(id, e.target.checked));
        }
    }
}

export default connect(null, mapDispatchToProps)(ListItem);
