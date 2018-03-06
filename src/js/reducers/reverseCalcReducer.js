import { REVERSE_CALC } from '../constants';

const reverseCalcReducer = (reverseCalc = false, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case REVERSE_CALC:
            reverseCalc = payload.value;
            break;
        default:
    }

    return reverseCalc;
}

export default reverseCalcReducer;
