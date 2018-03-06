import { IS_OIL } from '../constants';

const isOilReducer = (isOil = false, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case IS_OIL:
            isOil = payload.value;
            break;
        default:
    }

    return isOil;
}

export default isOilReducer;
