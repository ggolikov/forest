import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state, ownProps) => {
    const { loader, layerId, idField, idFieldIndex, featuresIds, featuresCount, attributesList } = state;
    const { lmap, gmxMap, type } = ownProps;

    return {
        loader,
        layerId,
        idFieldIndex,
        idField,
        featuresIds,
        featuresCount,
        attributesList,
        lmap,
        gmxMap,
        type
    };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { layerId, idField, featuresIds, featuresCount, attributesList } = stateProps;
    const { dispatch } = dispatchProps;

    return {
        ...stateProps,
        ...ownProps,
    }
}

const AppContainer = connect(mapStateToProps, null, mergeProps)(App);

export default AppContainer;
