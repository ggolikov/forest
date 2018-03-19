import { SET_LAYER_ID } from '../constants';

const layerIdReducer = (layerId = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_LAYER_ID:
            layerId = payload.layerId;
            break;
        default:
    }

    return layerId;
}

export default layerIdReducer;
