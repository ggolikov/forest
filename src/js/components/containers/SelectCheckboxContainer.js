import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from '../Checkbox';
import { updateFeature } from '../../AC';

const mapStateToProps = (state, ownProps) => {
    const { param } = ownProps;

    return { value: state[param] };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;

    return {
        ...ownProps,
        onChange: e => {
            const value = e.target.checked;
            dispatch(updateFeature(id, value));
        }
    }
}

const SelectCheckboxContainer = connect(null, mapDispatchToProps)(Checkbox);

export default SelectCheckboxContainer;
