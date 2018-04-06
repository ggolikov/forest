import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '../Select';
import { withLabel } from '../../HOC';
import * as actionCreators from '../../AC';
import storeMapping from '../../storeMapping';
import { BLANK_SELECT_OPTION } from '../../constants';

const mapStateToProps = (state, ownProps) => {
    let { label, param, values, loading, loadAttributes, size } = ownProps;
    let value = state[param];

    size = size || 'large';

    return { label, value, values, loading, loadAttributes, size };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { param, values, mapValues, loadAttributes } = ownProps;
    const dispatchFuncName = storeMapping[param];
    const dispatchFunc = actionCreators[dispatchFuncName];

    return {
        ownProps,
        onChange: e => {
            let { value } = e.target;

            if (mapValues) {
                value = values.reduce((previousValue, currentValue, index, array) => {
                            if (currentValue.title === value) {
                                return currentValue.layerId;
                            }
                        });
            }

            if (loadAttributes) {
                value = { value, loadAttributes }
            }

            dispatch(dispatchFunc(value || BLANK_SELECT_OPTION));
        }
    }
}

const SelectContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Select));

export default SelectContainer;
