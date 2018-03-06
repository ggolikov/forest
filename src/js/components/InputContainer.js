import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { withLabel } from '../HOC';
import { changeHoursStep, changeName } from '../AC';

const mapStateToProps = (state, ownProps) => {
    const { step, name } = state;
    const { label, param } = ownProps;
    const value = param === 'step' ? step : name;

    return { label, value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const dispatchFunc = ownProps.param === 'step' ? changeHoursStep : changeName;

    return {
        onChange: e => {
            const value = ownProps.param === 'step' ? Number(e.target.value) : e.target.value;
            dispatch(dispatchFunc(value));
        }
    }
}

const InputContainer = connect(mapStateToProps, mapDispatchToProps)(withLabel(Input));

export default InputContainer;
