import { CHANGE_FELLING_FORM } from '../constants';

const fellingFormReducer = (fellingForm = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_FELLING_FORM:
            fellingForm = payload.fellingForm;
            break;
        default:
    }

    return fellingForm;
}

export default fellingFormReducer;
