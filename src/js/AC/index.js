import {
    CHANGE_LOADER_STATUS,
    SET_LAYER_ID,
    SET_REPORTS_COUNT,
    SET_QUADRANT_LAYER_ID,
    SET_ID_FIELD,
    SET_ID_FIELD_INDEX,
    SET_FEATURES_IDS,
    UPDATE_FEATURE,
    UPDATE_FEATURES,
    REVERT_SELECTION,
    CLEAR_SELECTION,
    SELECT_ALL_FEATURES,
    SET_FEATURES_COUNT,
    SET_ATTRIBUTES_LIST,
    SET_SATELLITE_LAYER,
    CHANGE_REPORT_TYPE,
    CHANGE_ORGANIZATION_NAME,
    CHANGE_INN,
    CHANGE_REGION,
    CHANGE_FORESTRY,
    CHANGE_SECTION_FORESTRY,
    CHANGE_QUADRANT,
    CHANGE_STRATUM,
    CHANGE_SITE,
    CHANGE_FELLING_FORM,
    CHANGE_FELLING_TYPE,
    CHANGE_RECOVERY_EVENT_TYPE
} from '../constants';

export function changeLoaderStatus(loader) {
    return {
        type: CHANGE_LOADER_STATUS,
        payload: { loader }
    }
}

export function setLayerId(layerId, query) {
    return {
        type: SET_LAYER_ID,
        payload: { layerId, query }
    }
}

export function setReportsCount(count) {
    return {
        type: SET_REPORTS_COUNT,
        payload: { count }
    }
}

export function setQuadrantLayerId(layerId) {
    return {
        type: SET_QUADRANT_LAYER_ID,
        payload: { layerId }
    }
}

export function setIdField(field) {
    return {
        type: SET_ID_FIELD,
        payload: { field }
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

export function setSatelliteLayer(satelliteLayerId) {
    return {
        type: SET_SATELLITE_LAYER,
        payload: { satelliteLayerId }
    }
}

export function updateFeature(id, selected) {
    return {
        type: UPDATE_FEATURE,
        payload: { id, selected }
    }
}

export function updateFeatures(features) {
    return {
        type: UPDATE_FEATURES,
        payload: { features }
    }
}

export function revertSelection() {
    return {
        type: REVERT_SELECTION
    }
}

export function clearSelection() {
    return {
        type: CLEAR_SELECTION
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

export function changeSite(site) {
    return {
        type: CHANGE_SITE,
        payload: { site }
    }
}

export function changeFellingForm(fellingForm) {
    return {
        type: CHANGE_FELLING_FORM,
        payload: { fellingForm }
    }
}

export function changeFellingType(fellingType) {
    return {
        type: CHANGE_FELLING_TYPE,
        payload: { fellingType }
    }
}

export function changeRecoveryEventType(recoveryEventType) {
    return {
        type: CHANGE_RECOVERY_EVENT_TYPE,
        payload: { recoveryEventType }
    }
}
