import {
    UPDATE_FEATURE,
    UPDATE_FEATURES,
    REVERT_SELECTION,
    CLEAR_SELECTION,
    SELECT_ALL_FEATURES
 } from '../constants';
import { setStyle, clearStyle, mergeArrays } from '../helpers';
import * as actionCreators from '../AC';

export default store => next => action => {
    const state = store.getState();
    const { layerId, featuresIds } = state;
    const { type, payload } = action;
    const layer = window.nsGmx.gmxMap.layersByID[layerId];

    let mappedFeatures = featuresIds.map(f => {
        return {
            id: f.id,
            selected: f.selected
        };
    });

    let selectedFeatures;

    if (type === UPDATE_FEATURE) {
        selectedFeatures = mappedFeatures.filter(f => {
            return f.selected;
        });
        let index = selectedFeatures.findIndex(item => item.id === payload.id);

        selectedFeatures = [
            ...selectedFeatures.slice(0, index),
            payload,
            ...selectedFeatures.slice(index + 1)
        ]
        setStyle(layer, selectedFeatures);
        next({ type, payload });
    } else if (type === UPDATE_FEATURES) {
        selectedFeatures = mappedFeatures.filter(f => {
            return f.selected;
        });
        // console.log(mergeArrays(selectedFeatures, payload.features));
        setStyle(layer, payload.features);
        next({ type, payload });
    } else if (type === REVERT_SELECTION) {
        selectedFeatures = mappedFeatures.filter(f => {
            return !f.selected;
        });
        setStyle(layer, selectedFeatures);
        next({ type, payload });
    } else if (type === CLEAR_SELECTION) {
        setStyle(layer, []);
        next({ type, payload });
    } else if (type === SELECT_ALL_FEATURES) {
        setStyle(layer, payload.selectAll ? featuresIds: []);
        next({ type, payload });
    } else {
        next({ type, payload });
    }
}
