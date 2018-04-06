import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import { withLabel } from '../../HOC';
import * as actionCreators from '../../AC';
import storeMapping from '../../storeMapping';

const mapStateToProps = (state, ownProps) => {
    const { label, param } = ownProps;
    let value = state[param];

    if (typeof value === 'object') {
        value = value.value;
    }

    return { label, value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { param } = ownProps;
    const dispatchFunc = actionCreators[param];

    return {
        ownProps,
        onClick: e => {
            dispatch(dispatchFunc());
        }
    }
}

const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Button));

export default ButtonContainer;
