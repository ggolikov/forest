import { BEGIN_DATE } from '../constants';

const beginDateReducer = (beginDate = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case BEGIN_DATE:
            beginDate = payload.value;
            break;
        default:
    }

    return beginDate;
}

export default beginDateReducer;
