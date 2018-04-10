import { EXPORT_PARAMS } from '../constants';
import encodeParams from './encodeParams';
import downloadFile from './downloadFile';

const makeReport = (reportParamsArray, url) => {
    let promiseArr = [];

    reportParamsArray.forEach((reportParams) => {
        reportParams.layerID = reportParams.layerId;
        delete reportParams.layerId;

        let url, options;

        if (reportParams.url) {
            url = 'http://maps.kosmosnimki.ru/Plugins/ForestReport/ForestReportImage?request={%20%22reportType%22:%20%22%D0%BE%D0%B1%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B8%20%D0%BB%D0%B5%D1%81%D0%BE%D0%B2%22,%20%22layerID%22:%20%224BD64872924B48D9876EFB9E9A1B7C71%22,%20%22featureID%22:%201,%20%22beginDate%22:%201523059200,%20%22endDate%22:%201523059201,%20%22satLayers%22:%20[%20%22636CBFF5155F4F299254EAF54079040C%22%20],%20%22organizationName%22:%20%22%D0%9E%D0%9E%D0%9E%20%27%D0%91%D0%B5%D1%80%D0%B5%D0%B7%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%20%D0%BB%D0%B5%D1%81%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE%27%22,%20%22inn%22:%20%223328455371%22,%20%22region%22:%20%22%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%22,%20%22forestry%22:%20%22%D0%91%D0%B5%D1%80%D0%B5%D0%B7%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%22,%20%22sectionForestry%22:%20%22%D0%9C%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%22,%20%22quadrant%22:%20112,%20%22stratum%22:%201126%20}';
        } else {
            url = `${window.serverBase}Plugins/ForestReport/ForestReportImage?request=${JSON.stringify(reportParams)}`;
        }

            options = {
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            };

        downloadFile(url);
        // promiseArr.push(
        //     fetch(url, options)
        //     .then(res => {
        //         return res.text();
        //     })
        //     .then(str => {
        //         console.log(str);
        //     })
        //     .catch(err => console.log(err))
        // );
    });

    // return Promise.all(promiseArr);
}

export default makeReport;
