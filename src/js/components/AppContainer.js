import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';
import { setFeaturesIds, setFeaturesCount, setAttributesList, setIdFieldIndex } from '../AC';

const mapStateToProps = (state, ownProps) => {
    const { layerId, idField, idFieldIndex, featuresIds, featuresCount, attributesList } = state;
    const { lmap, gmxMap } = ownProps;

    return {
        layerId,
        idFieldIndex,
        idField,
        featuresIds,
        featuresCount,
        attributesList,
        lmap,
        gmxMap
    };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { layerId, idField, featuresIds, featuresCount, attributesList } = stateProps;
    const { dispatch } = dispatchProps;

    return {
        ...stateProps,
        ...ownProps,
        getFeaturesAndCount: json => {
            const index = json.Result.fields.indexOf(stateProps.idField);
            const featuresIds = json.Result.values.map(value => value[index]);
            dispatch(setFeaturesIds(featuresIds));
            dispatch(setFeaturesCount(json.Result.Count));
            dispatch(setAttributesList(json.Result.fields));
            dispatch(setIdFieldIndex(index));
        }
    }
}

const AppContainer = connect(mapStateToProps, null, mergeProps)(App);

export default AppContainer;
