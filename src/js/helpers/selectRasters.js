import { SENTINEL_LAYER_ID } from '../constants';
import encodeParams from './encodeParams';

const selectRasters = (gmxMap, geometry, state) => {
    const layers = state.satLayers;
    let promiseArr = [];

    layers.forEach((layer) => {
        const l = gmxMap.layersByID[layer.layerId];
        const { beginDate, endDate } = l.getDateInterval && l.getDateInterval();

        // BUG
        // const timeQuery = (beginDate && endDate) ?
        //         `AND ([acqdate] > '${beginDate.toLocaleDateString()}' OR [acqdate] < '${beginDate.toLocaleDateString()}')` : '';

        const timeQuery = (beginDate && endDate) ?
                `AND ([acqdate] = '${beginDate.toLocaleDateString()}')` : '';

        const params = {
            layer: layer.layerId,
            page: 0,
            pagesize: 500,
            query: `STIntersects([gmx_geometry], GeometryFromGeoJson('${JSON.stringify(geometry)}', 3857))${timeQuery}`
        },
        url = `${window.serverBase}VectorLayer/Search.ashx?${encodeParams(params)}`,
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
                let res = JSON.parse(str.substring(1, str.length-1));

                return Promise.resolve({ layer: layer, result: res.Result });
            })
            .catch(err => console.log(err))
        );
    });

    return Promise.all(promiseArr);
}

export default selectRasters;
