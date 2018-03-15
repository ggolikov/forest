import { CHANGE_FORESTRY } from '../constants';

const forestryReducer = (forestry = "Березниковское", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_FORESTRY:
            forestry = payload.forestry;
            break;
        default:
    }

    return forestry;
}

export default forestryReducer;
