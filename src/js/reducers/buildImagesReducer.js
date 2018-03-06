import { BUILD_IMAGES } from '../constants';

const buildImagesReducer = (buildImages = false, action) => {
    const {type, payload} = action;

    switch (action.type) {
        case BUILD_IMAGES:
            buildImages = payload.value;
            break;
        default:
    }

    return buildImages;
}

export default buildImagesReducer;
