import { SET_ATTRIBUTES_LIST } from '../constants';

const attributesListReducer = (attributesList = [], action) => {
    const {type, payload} = action;

    switch (action.type) {
        case SET_ATTRIBUTES_LIST:
            attributesList = payload.list;
            break;
        default:
    }

    return attributesList;
}

export default attributesListReducer;
