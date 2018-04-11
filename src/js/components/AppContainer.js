import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFeature } from '../AC';
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
    const { layerId, idField, featuresCount, attributesList } = stateProps;
    const { dispatch } = dispatchProps;

    return {
        selectFeature: (e) => {
            const { featuresIds } = window.store.getState();
            const { id } = e.gmx;
            const selectedFeatures = featuresIds.filter(f => {
                return f.selected;
            });
            const index = selectedFeatures.findIndex(item => item.id === id);
                dispatch(updateFeature(id, index === -1));
        },
        ...stateProps,
        ...ownProps,
    }
}

const AppContainer = connect(mapStateToProps, null, mergeProps)(App);

export default AppContainer;
