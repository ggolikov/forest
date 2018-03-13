import {
    SET_FEATURES_IDS,
    CHANGE_FEATURE_SELETION,
    REVERT_SELECTION,
    SELECT_ALL_FEATURES
 } from '../constants';

const featuresIdsReducer = (featuresIds = [], action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_FEATURES_IDS:
            return payload.ids;
            break;
        case CHANGE_FEATURE_SELETION:
            const { id, selected } = payload,
                index = featuresIds.findIndex(item => item.id === id),
                feature = featuresIds[index];

            const updatedIds = [
                ...featuresIds.slice(0, index),
                {
                    id: feature.id,
                    selected: selected
                },
                ...featuresIds.slice(index + 1)
            ]
            return updatedIds;
            break;
        case REVERT_SELECTION:
            return featuresIds.map(item => {
                return {
                    id: item.id,
                    selected: !item.selected
                }
            });
            break;
        case SELECT_ALL_FEATURES:
        const { selectAll } = payload;

        return featuresIds.map(item => {
            return {
                id: item.id,
                selected: selectAll
            }
        });
            break;
        default:
    }

    return featuresIds;
}

export default featuresIdsReducer;
