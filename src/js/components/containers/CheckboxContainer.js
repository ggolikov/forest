import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from '../Checkbox';
import * as actionCreators from '../../AC';

const mapStateToProps = (state, ownProps) => {
    const { param } = ownProps;

    return { value: state[param] };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { param } = ownProps;
    const dispatchFunc = actionCreators[param];

    return {
        ownProps,
        onChange: e => {
            const value = e.target.checked;
            dispatch(dispatchFunc(value));
        }
    }
}

const CheckboxContainer = connect(mapStateToProps, mapDispatchToProps)(Checkbox);

export default CheckboxContainer;
