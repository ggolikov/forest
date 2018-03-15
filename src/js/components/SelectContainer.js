import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import { withLabel } from '../HOC';
import * as actionCreators from '../AC';
import storeMapping from '../storeMapping';

const mapStateToProps = (state, ownProps) => {
    const { label, param, values, loading } = ownProps;
    const value = state[param];

    return { label, value, values, loading };
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

const SelectContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Select));

export default SelectContainer;
