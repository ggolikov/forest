import { SET_REPORTS_COUNT } from '../constants';

const reportsCountReducer = (count = 0, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_REPORTS_COUNT:
            count = payload.count;
            break;
        default:
    }

    return count;
}

export default reportsCountReducer;
