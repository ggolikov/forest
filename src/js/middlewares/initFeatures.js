import { SET_LAYER_ID, DEMO_GEOMETRY_FIELD } from '../constants';
import { loadFeatures, mapFeaturesToStore } from '../helpers';
import * as actionCreators from '../AC';

export default store => next => action => {
    const state = store.getState();
    const { idField } = state;
    const { type, payload } = action;

    const getFeaturesAndCount = json => {
        if (json.Status !== 'error') {
            const index = json.Result.fields.indexOf(idField);
            const featuresIds = mapFeaturesToStore(json.Result, index, false);

            featuresIds.sort((a,b) => {
                return a.id - b.id;
            });

            next(actionCreators.setFeaturesIds(featuresIds));
            next(actionCreators.setFeaturesCount(json.Result.Count));
            next(actionCreators.setAttributesList(json.Result.fields));
            next(actionCreators.setIdFieldIndex(index));
            next(actionCreators.changeLoaderStatus(false));
        }
        next({ type, payload });
    };

    if (type === SET_LAYER_ID) {
        if (payload.layerId) {
            loadFeatures(payload.layerId, 0, null, 'add')
                .then(json => getFeaturesAndCount(json));
            next(actionCreators.changeLoaderStatus(true));
        } else {
            next(actionCreators.changeLoaderStatus(false));
            next({ type, payload });
        }
    } else {
        next({ type, payload });
    }
}
