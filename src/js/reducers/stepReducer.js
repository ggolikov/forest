import { CHANGE_HOURS_STEP } from '../constants';

const stepReducer = (step = 2, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_HOURS_STEP:
            step = payload.step;
            break;
        default:
    }

    return step;
}

export default stepReducer;
