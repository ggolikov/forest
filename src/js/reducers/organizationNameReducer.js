import { CHANGE_ORGANIZATION_NAME } from '../constants';

const organizationNameReducer = (organizationName = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_ORGANIZATION_NAME:
            organizationName = payload.name;
            break;
        default:
    }

    return organizationName;
}

export default organizationNameReducer;
