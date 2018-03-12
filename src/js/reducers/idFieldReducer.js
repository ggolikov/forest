import { SET_ID_FIELD, DEMO_ID_FIELD } from '../constants';

const idFieldReducer = (idField = DEMO_ID_FIELD, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_ID_FIELD:
            idField = payload.field;
            break;
        default:
    }

    return idField;
}

export default idFieldReducer;
