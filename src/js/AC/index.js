import {
    CHANGE_LOADER_STATUS,
    SET_LAYER_ID,
    SET_ID_FIELD,
    SET_ID_FIELD_INDEX,
    SET_FEATURES_IDS,
    CHANGE_FEATURE_SELETION,
    REVERT_SELECTION,
    SELECT_ALL_FEATURES,
    SET_FEATURES_COUNT,
    SET_ATTRIBUTES_LIST,
    CHANGE_REPORT_TYPE,
    CHANGE_ORGANIZATION_NAME,
    CHANGE_INN,
    CHANGE_REGION,
    CHANGE_FORESTRY,
    CHANGE_SECTION_FORESTRY,
    CHANGE_QUADRANT,
    CHANGE_STRATUM
} from '../constants';

export function changeLoaderStatus(loader) {
    return {
        type: CHANGE_LOADER_STATUS,
        payload: { loader }
    }
}

export function setLayerId(layerId) {
    return {
        type: SET_LAYER_ID,
        payload: { layerId }
    }
}

export function setIdField(field) {
    return {
        type: SET_ID_FIELD,
        payload: { layerId }
    }
}

export function setIdFieldIndex(index) {
    return {
        type: SET_ID_FIELD_INDEX,
        payload: { index }
    }
}

export function setFeaturesIds(ids) {
    return {
        type: SET_FEATURES_IDS,
        payload: { ids }
    }
}

export function changeFeatureSelection(id, selected) {
    return {
        type: CHANGE_FEATURE_SELETION,
        payload: { id, selected }
    }
}

export function revertSelection() {
    return {
        type: REVERT_SELECTION
    }
}

export function selectAllFeatures(selectAll) {
    return {
        type: SELECT_ALL_FEATURES,
        payload: { selectAll }
    }
}

export function setFeaturesCount(count) {
    return {
        type: SET_FEATURES_COUNT,
        payload: { count }
    }
}

export function setAttributesList(list) {
    return {
        type: SET_ATTRIBUTES_LIST,
        payload: { list }
    }
}

export function changeReportType(reportType) {
    return {
        type: CHANGE_REPORT_TYPE,
        payload: { reportType }
    }
}

export function changeOrganizationName(name) {
    return {
        type: CHANGE_ORGANIZATION_NAME,
        payload: { name }
    }
}

export function changeInn(inn) {
    return {
        type: CHANGE_INN,
        payload: { inn }
    }
}

export function changeRegion(region) {
    return {
        type: CHANGE_REGION,
        payload: { region }
    }
}

export function changeForestry(forestry) {
    return {
        type: CHANGE_FORESTRY,
        payload: { forestry }
    }
}

export function changeSectionForestry(sectionForestry) {
    return {
        type: CHANGE_SECTION_FORESTRY,
        payload: { sectionForestry }
    }
}

export function changeQuadrant(quadrant) {
    return {
        type: CHANGE_QUADRANT,
        payload: { quadrant }
    }
}

export function changeStratum(stratum) {
    return {
        type: CHANGE_STRATUM,
        payload: { stratum }
    }
}
