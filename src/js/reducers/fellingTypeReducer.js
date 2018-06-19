import { CHANGE_FELLING_TYPE } from '../constants';

const fellingTypeReducer = (fellingType = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_FELLING_TYPE:
            fellingType = payload.fellingType;
            break;
        default:
    }

    return fellingType;
}

export default fellingTypeReducer;
