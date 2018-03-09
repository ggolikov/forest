import {
    CHANGE_REPORT_TYPE,
    CHANGE_ORGANIZATION_NAME,
    CHANGE_INN
} from '../constants';

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
