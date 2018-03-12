import {
    SET_LAYER_ID,
    SET_ID_FIELD,
    SET_ID_FIELD_INDEX,
    SET_FEATURES_IDS,
    SET_FEATURES_COUNT,
    SET_ATTRIBUTES_LIST,
    CHANGE_REPORT_TYPE,
    CHANGE_ORGANIZATION_NAME,
    CHANGE_INN
} from '../constants';

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
