import { COUNT_CURRENTS } from '../constants';

const currentsReducer = (countCurrents = false, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case COUNT_CURRENTS:
            countCurrents = payload.value;
            break;
        default:
    }

    return countCurrents;
}

export default currentsReducer;
