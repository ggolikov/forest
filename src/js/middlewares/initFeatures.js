import { SET_LAYER_ID, DEMO_GEOMETRY_FIELD } from '../constants';
import { loadFeatures } from '../helpers';
import * as actionCreators from '../AC';

export default store => next => action => {
    const state = store.getState();
    const { idField } = state;
    const { type, payload } = action;

    const getFeaturesAndCount = json => {
        if (json.Status !== 'error') {
            const index = json.Result.fields.indexOf(idField);
            const geometryIndex = json.Result.fields.indexOf(DEMO_GEOMETRY_FIELD);
            const featuresIds = json.Result.values.map(value => {
                return {
                    id: value[index],
                    selected: false,
                    geometry: value[geometryIndex]
                };
            });

            next(actionCreators.setFeaturesIds(featuresIds));
            next(actionCreators.setFeaturesCount(json.Result.Count));
            next(actionCreators.setAttributesList(json.Result.fields));
            next(actionCreators.setIdFieldIndex(index));
            next(actionCreators.changeLoaderStatus(false));
        }
        next({type, payload});
    };

    if (type === SET_LAYER_ID) {
        if (payload.layerId) {
            loadFeatures(payload.layerId, 0, null, 'add')
                .then(json => getFeaturesAndCount(json));
            next(actionCreators.changeLoaderStatus(true));
        }
        else {
            next(actionCreators.changeLoaderStatus(false));
            next({type, payload});
        }
    } else {
        next({type, payload});
    }
}
