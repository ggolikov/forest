import { CHANGE_LOADER_STATUS } from '../constants';

const loaderReducer = (loader = false, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_LOADER_STATUS:
            loader = payload.loader;
            break;
        default:
    }

    return loader;
}

export default loaderReducer;
