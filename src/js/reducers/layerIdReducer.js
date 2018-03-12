import { SET_LAYER_ID, DEMO_LAYER_ID } from '../constants';

const layerIdReducer = (layerId = DEMO_LAYER_ID, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_LAYER_ID:
            layerId = payload.inn;
            break;
        default:
    }

    return layerId;
}

export default layerIdReducer;
