import { SET_SATELLITE_LAYER } from '../constants';

const satelliteLayerIdReducer = (satelliteLayerId = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_SATELLITE_LAYER:
            satelliteLayerId = payload.satelliteLayerId;
            break;
        default:
    }

    return satelliteLayerId;
}

export default satelliteLayerIdReducer;
