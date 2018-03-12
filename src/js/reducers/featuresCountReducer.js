import { SET_FEATURES_COUNT } from '../constants';

const featuresCountReducer = (featuresCount = 0, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_FEATURES_COUNT:
            featuresCount = payload.count;
            break;
        default:
    }

    return featuresCount;
}

export default featuresCountReducer;
