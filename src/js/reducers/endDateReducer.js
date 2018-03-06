import { END_DATE } from '../constants';

const endDateReducer = (endDate = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case END_DATE:
            endDate = payload.value;
            break;
        default:
    }

    return endDate;
}

export default endDateReducer;
