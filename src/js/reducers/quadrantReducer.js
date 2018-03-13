import { CHANGE_QUADRANT } from '../constants';

const quadrantReducer = (quadrant = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_QUADRANT:
            region = payload.quadrant;
            break;
        default:
    }

    return quadrant;
}

export default quadrantReducer;
