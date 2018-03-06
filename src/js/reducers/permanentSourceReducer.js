import { PERMANENT_SOURCE } from '../constants';

const permanentSourceReducer = (permanentSource = false, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case PERMANENT_SOURCE:
            permanentSource = payload.value;
            break;
        default:
    }

    return permanentSource;
}

export default permanentSourceReducer;
