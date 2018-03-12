import { SET_ID_FIELD_INDEX } from '../constants';

const idFieldIndexReducer = (idFieldIndex = 0, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_ID_FIELD_INDEX:
            idFieldIndex = payload.index;
            break;
        default:
    }

    return idFieldIndex;
}

export default idFieldIndexReducer;
