import { CHANGE_SITE } from '../constants';

const siteReducer = (site = "", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_SITE:
            site = payload.site;
            break;
        default:
    }

    return site;
}

export default siteReducer;
