import React, { Component } from 'react';
import SqlEditor from './Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../AC';
import storeMapping from '../../storeMapping';

const mapDispatchToProps = (dispatch, ownProps) => {
    const { layerId } = ownProps;
    const dispatchFunc = actionCreators[dispatchFuncName];

    return {
        ...ownProps,
        onChange: e => {
            dispatch(setLayerId(layerId, e.target.value));
        }
    }
}

export default connect(null, mapDispatchToProps)(SqlEditor);
