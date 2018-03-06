import { CHANGE_NAME } from '../constants';

const nameReducer = (name = 'test', action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_NAME:
            name = payload.name;
            break;
        default:
    }

    return name;
}

export default nameReducer;
