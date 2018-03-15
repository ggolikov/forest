import { CHANGE_REGION } from '../constants';

const regionReducer = (region = "Владимирская область", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_REGION:
            region = payload.region;
            break;
        default:
    }

    return region;
}

export default regionReducer;
