import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import { withLabel } from '../HOC';
import { changeReportType } from '../AC';

const mapStateToProps = (state, ownProps) => {
    const { reportType } = state;
    const { label, param, values } = ownProps;

    let value = null;

    switch (ownProps.param) {
        case "reportType":
            value = reportType;
            break;
        default:
    }

    return { label, value, values };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let dispatchFunc = null;
    switch (ownProps.param) {
        case "reportType":
            dispatchFunc = changeReportType;
            break;
        default:
    }

    return {
        onChange: e => {
            dispatch(dispatchFunc(e.target.value));
        }
    }
}

const SelectContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Select));

export default SelectContainer;
