import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { withLabel } from '../HOC';
import { changeOrganizationName, changeInn } from '../AC';

const mapStateToProps = (state, ownProps) => {
    const { organizationName, inn } = state;
    const { label, param } = ownProps;

    let value = null;

    switch (ownProps.param) {
        case "organizationName":
            value = organizationName;
            break;
        case "inn":
            value = inn;
            break;
        default:
    }

    return { label, value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let dispatchFunc = null;
    switch (ownProps.param) {
        case "organizationName":
            dispatchFunc = changeOrganizationName;
            break;
        case "inn":
            dispatchFunc = changeInn;
            break;
        default:
    }

    return {
        onChange: e => {
            dispatch(dispatchFunc(e.target.value));
        }
    }
}

const InputContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Input));

export default InputContainer;
