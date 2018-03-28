import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';
import { zoomToFeature, getFeatureProps, getFeatureProps2, preview } from '../helpers';
import { changeFeatureSelection } from '../AC';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    onZoomIconClick = (e) => {
        const { layerId, geometry } = this.props;

        zoomToFeature(layerId, geometry);
    }

    showPreview = (e) => {
        const { id, geometry } = this.props;
        const state = window.store.getState();

        // getFeatureProps({ id, geometry }, state)
        //     .then(res => {
        //         console.log(res);
        //         preview(res);
        //     });

        getFeatureProps2({ id, geometry }, state)
            .then(res => {
                console.log(res);
                preview(res);
            });
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

        const className = active ? "gmx-list-item gmx-list-item active": "gmx-list-item";

        return (
            <div className={className}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <div className={"feature-list-item-part feature-list-item-part-left"}>
                    <Checkbox checked={selected} onChange={onItemSelect}></Checkbox>
                </div>
                <div className={"feature-list-item-part"}>
                    {txt}
                </div>
                <div className={"feature-list-item-part feature-list-item-part"} onClick={this.onZoomIconClick}>
                    <i className={`icon-eye`}></i>
                </div>
                <div className={"feature-list-item-part feature-list-item-part-right"} onClick={this.showPreview}>
                    <i className={`icon-forward`}></i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        state
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

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
