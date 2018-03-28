import {
    CHANGE_REGION,
    CHANGE_FORESTRY,
    CHANGE_SECTION_FORESTRY,
    CHANGE_QUADRANT,
    CHANGE_STRATUM
} from '../constants';
import { loadFeatures } from '../helpers';
import * as actionCreators from '../AC';

export default store => next => action => {
    const state = store.getState();
    const { layerId, idField } = state;
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

    if (
        type === CHANGE_REGION ||
        type === CHANGE_FORESTRY ||
        type === CHANGE_SECTION_FORESTRY ||
        type === CHANGE_QUADRANT ||
        type === CHANGE_STRATUM
    ) {

        if (typeof payload === 'object') {

        } else {
            next({type, payload});
        }

        if (payload.layerId) {
            loadFeatures(payload.layerId, 0, null, 'add')
                .then(json => getFeaturesAndCount(json));
            next(actionCreators.changeLoaderStatus(true));
        }
    }
}
