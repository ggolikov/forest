import { SET_QUADRANT_LAYER_ID } from '../constants';

const quadrantLayerIdReducer = (quadrantLayerId = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_QUADRANT_LAYER_ID:
            quadrantLayerId = payload.layerId;
            break;
        default:
    }

    return quadrantLayerId;
}

export default quadrantLayerIdReducer;
