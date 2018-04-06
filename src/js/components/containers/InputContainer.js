import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../Input';
import { withLabel } from '../../HOC';
import * as actionCreators from '../../AC';
import storeMapping from '../../storeMapping';

const mapStateToProps = (state, ownProps) => {
    let { param, size, label, labelSize } = ownProps;
    let value = state[param];

    size = size || 'large';
    labelSize = labelSize || "small";

    if (typeof value === 'object') {
        value = value.value;
    }

    return { label, value, size, labelSize };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { param } = ownProps;
    const dispatchFuncName = storeMapping[param];
    const dispatchFunc = actionCreators[dispatchFuncName];

    return {
        ...ownProps,
        onChange: e => {
            dispatch(dispatchFunc(e.target.value));
        }
    }
}

const InputContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Input));

export default InputContainer;
