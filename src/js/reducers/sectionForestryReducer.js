import { CHANGE_SECTION_FORESTRY } from '../constants';

const sectionForestryReducer = (sectionForestry = "Морозовское", action) => {
    const {type, payload} = action;

    switch (action.type) {
        case CHANGE_SECTION_FORESTRY:
            sectionForestry = payload.sectionForestry;
            break;
        default:
    }

    return sectionForestry;
}

export default sectionForestryReducer;
