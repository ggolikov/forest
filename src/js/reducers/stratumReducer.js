import { CHANGE_STRATUM } from '../constants';

const stratumReducer = (stratum = 1126, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_STRATUM:
            stratum = payload.stratum;
            break;
        default:
    }

    return stratum;
}

export default stratumReducer;
