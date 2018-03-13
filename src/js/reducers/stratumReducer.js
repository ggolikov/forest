import { CHANGE_STRATUM } from '../constants';

const stratumReducer = (stratum = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_STRATUM:
            region = payload.stratum;
            break;
        default:
    }

    return stratum;
}

export default stratumReducer;
