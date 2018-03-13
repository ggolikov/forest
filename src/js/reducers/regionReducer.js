import { CHANGE_REGION } from '../constants';

const regionReducer = (region = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_REGION:
            region = payload.field;
            break;
        default:
    }

    return region;
}

export default regionReducer;
