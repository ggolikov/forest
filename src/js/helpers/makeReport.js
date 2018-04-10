import encodeParams from './encodeParams';

const makeReport = (reportParamsArray) => {
    reportParamsArray.forEach((reportParams) => {
        const params = {
            layer: layerId,
            page: 0,
            pagesize: 500,
            query: `STIntersects([gmx_geometry], GeometryFromGeoJson('${JSON.stringify(geometry)}', 3857))${timeQuery}`
        },
        http://maps.kosmosnimki.ru/Plugins/ForestReport/ForestReportImage?request=...
        url = `${window.serverBase}Plugins/ForestReport/ForestReportImage?request=${encodeParams(reportParams)}`,
        options = {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        };

        promiseArr.push(
            fetch(url, options)
            .then(res => {
                return res.text();
            })
            .then(str => {
                console.log(str);
            })
            .catch(err => console.log(err))
        );
    });

    return Promise.all(promiseArr);
}

export default makeReport;
