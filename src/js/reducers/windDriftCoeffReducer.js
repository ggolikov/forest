import { WIND_DRIFT } from '../constants';

const windDriftCoeffReducer = (windDriftCoeff = 0.03, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case WIND_DRIFT:
            windDriftCoeff = payload.value;
            break;
        default:
    }

    return windDriftCoeff;
}

export default windDriftCoeffReducer;
