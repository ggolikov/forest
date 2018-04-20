import { EXPORT_PARAMS } from '../constants';
import encodeParams from './encodeParams';
import sendAsyncRequest from './sendAsyncRequest';
import downloadFile from './downloadFile';

const makeReport = (reportParamsArray) => {
    let requests = reportParamsArray.map(reportParams => {
        reportParams.layerID = reportParams.layerId;
        delete reportParams.layerId;

        return reportParams;
    });

    let params = {
        groupRequest: JSON.stringify(requests)
    };

    let url = `${window.serverBase}Plugins/ForestReport/ForestReportImage?`,
        options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            body: encodeParams(params),
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
        };

    return fetch(url, options)
        .then(res => res.text())
        .then(str => {
            const res = JSON.parse(str.substring(1, str.length-1));
            const { TaskID, Completed } = res.Result;
            return sendAsyncRequest(TaskID);
        })
        .then(res => {
            let url = window.serverBase + res.Result.Result.downloadFile;
            downloadFile(url);
        })
        .catch(err => console.log(err));
}

export default makeReport;
