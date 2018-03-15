import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { withLabel } from '../HOC';
import * as actionCreators from '../AC';
import storeMapping from '../storeMapping';

const mapStateToProps = (state, ownProps) => {
    const { label, param } = ownProps;
    const value = state[param];

    return { label, value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { param } = ownProps;
    const dispatchFuncName = storeMapping[param];
    const dispatchFunc = actionCreators[dispatchFuncName];

    return {
        onChange: e => {
            dispatch(dispatchFunc(e.target.value));
        }
    }
}

const InputContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Input));

export default InputContainer;
