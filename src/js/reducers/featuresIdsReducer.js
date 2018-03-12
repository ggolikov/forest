import { SET_FEATURES_IDS } from '../constants';

const featuresIdsReducer = (featuresIds = [], action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_FEATURES_IDS:
            featuresIds = payload.ids;
            break;
        default:
    }

    return featuresIds;
}

export default featuresIdsReducer;
