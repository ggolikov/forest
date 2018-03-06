import { COUNT_WIND } from '../constants';

const windReducer = (countWind = false, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case COUNT_WIND:
            countWind = payload.value;
            break;
        default:
    }

    return countWind;
}

export default windReducer;
