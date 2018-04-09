import {
    UPDATE_FEATURE,
    UPDATE_FEATURES,
    REVERT_SELECTION,
    CLEAR_SELECTION,
    SELECT_ALL_FEATURES
 } from '../constants';
import { setStyle, clearStyle } from '../helpers';
import * as actionCreators from '../AC';

export default store => next => action => {
    const state = store.getState();
    const { layerId, featuresIds } = state;
    const { type, payload } = action;
    const layer = window.nsGmx.gmxMap.layersByID[layerId];

    if (type === UPDATE_FEATURE) {
        clearStyle(layer, featuresIds);
        setStyle(layer, [payload]);
        next({ type, payload });
    } else if (type === UPDATE_FEATURES) {
        next({ type, payload });
    } else if (type === REVERT_SELECTION) {
        next({ type, payload });
    } else if (type === CLEAR_SELECTION) {
        next({ type, payload });
    } else if (type === SELECT_ALL_FEATURES) {
        clearStyle(layer, featuresIds);
        setStyle(layer, featuresIds);
        next({ type, payload });
    } else {
        next({ type, payload });
    }
}
