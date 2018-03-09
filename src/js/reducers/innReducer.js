import { CHANGE_INN } from '../constants';

const innReducer = (inn = "3328455371", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_INN:
            inn = payload.inn;
            break;
        default:
    }

    return inn;
}

export default innReducer;
