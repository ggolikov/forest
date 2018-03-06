import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addPoint } from '../AC';

const AddButton = (props) => {
    return (
        <Button onClick={props.onClick}>
            {"Добавить точку"}
        </Button>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        points: state.points,
        label: ownProps.label
    }
}

const mergeProps = (stateProps, dispatchProps) => {
    const { points } = stateProps;
    const { dispatch } = dispatchProps;
    const index = points.length;

    return {
        onClick: e => {
            dispatch(addPoint({id: index, x: null, y: null}))
        }
    };
};

export default connect(mapStateToProps, null, mergeProps)(AddButton);
