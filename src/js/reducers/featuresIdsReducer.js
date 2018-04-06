import {
    SET_FEATURES_IDS,
    UPDATE_FEATURE,
    UPDATE_FEATURES,
    REVERT_SELECTION,
    CLEAR_SELECTION,
    SELECT_ALL_FEATURES
 } from '../constants';

 import { mergeArrays } from '../helpers';

const featuresIdsReducer = (featuresIds = [], action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_FEATURES_IDS:
            return payload.ids;
            break;
        case UPDATE_FEATURE:
            const { id, selected } = payload,
                index = featuresIds.findIndex(item => item.id === id),
                feature = featuresIds[index],
                updatedFeature = Object.assign({}, feature, {selected: selected});

            const updatedIds = [
                ...featuresIds.slice(0, index),
                updatedFeature,
                ...featuresIds.slice(index + 1)
            ]
            return updatedIds;
            break;
        case UPDATE_FEATURES:
            const { features } = payload;
            const updated = mergeArrays(featuresIds, features);

            return updated;
            break;
        case REVERT_SELECTION:
            return featuresIds.map(item => {
                item.selected = !item.selected;
                return item;
            });
            break;
        case CLEAR_SELECTION:

            return featuresIds.map(item => {
                item.selected = false;
                return item;
            });
            break;
        case SELECT_ALL_FEATURES:
            const { selectAll } = payload;

            return featuresIds.map(item => {
                item.selected = selectAll;
                return item;
            });
            break;
        default:
    }

    return featuresIds;
}

export default featuresIdsReducer;
