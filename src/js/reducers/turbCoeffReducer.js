import { TURBULENTION } from '../constants';

const turbCoeffReducer = (turbulentExchangeCoeff = 0.3, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case TURBULENTION:
            turbulentExchangeCoeff = payload.value;
            break;
        default:
    }

    return turbulentExchangeCoeff;
}

export default turbCoeffReducer;
