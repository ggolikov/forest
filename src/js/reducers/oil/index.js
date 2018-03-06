import {
    OIL_TYPE,
    WEIGHT,
    SPILL_DURATION,
    CONDITION
} from '../../constants';

const oilReducer = (oil = {
    oilType: "Light",
    weight: 4,
    spillDuration: 0,
    condition: 0
}, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case OIL_TYPE:
            oil = Object.assign({}, oil, {oilType: payload.value});
            break;
        case WEIGHT:
            oil = Object.assign({}, oil, {weight: payload.value});
            break;
        case SPILL_DURATION:
            oil = Object.assign({}, oil, {spillDuration: payload.value});
            break;
        case CONDITION:
            oil = Object.assign({}, oil, {condition: payload.value});
            break;
        default:
    }

    return oil;
}

export default oilReducer;
