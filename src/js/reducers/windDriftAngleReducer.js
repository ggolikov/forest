import { WIND_DRIFT } from '../constants';

const windDriftAngleReducer = (driftCurrentsRotationAngle = 10, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case WIND_DRIFT:
            driftCurrentsRotationAngle = payload.value;
            break;
        default:
    }

    return driftCurrentsRotationAngle;
}

export default windDriftAngleReducer;
