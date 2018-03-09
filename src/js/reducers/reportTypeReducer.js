import { CHANGE_REPORT_TYPE } from '../constants';

const defaultReportType = window._gtxt("об использовании лесов");

const reportTypeReducer = (reportType = defaultReportType, action) => {
    const { type, payload } = action;

    switch (action.type) {
        case CHANGE_REPORT_TYPE:
            reportType = payload.reportType;
            break;
        default:
    }

    return reportType;
}

export default reportTypeReducer;
