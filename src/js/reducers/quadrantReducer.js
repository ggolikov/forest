import { CHANGE_QUADRANT } from '../constants';

const quadrantReducer = (quadrant = 112, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_QUADRANT:
            quadrant = payload.quadrant;
            break;
        default:
    }

    return quadrant;
}

export default quadrantReducer;
