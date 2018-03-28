import { SENTINEL_LAYER_ID } from '../constants';
import encodeParams from './encodeParams';

const selectRasters = (gmxMap, geometry) => {
    // TODO: implement logic of searching for layers
    // currently using default sentinel layer

    const layerIds = [SENTINEL_LAYER_ID];
    let promiseArr = [];

    layerIds.forEach((layerId) => {
        const l = gmxMap.layersByID[layerId];
        const { beginDate, endDate } = l.getDateInterval && l.getDateInterval();

        const params = {
            layer: layerId,
            page: 0,
            pagesize: 500,
            query: `STIntersects([gmx_geometry], GeometryFromGeoJson('${JSON.stringify(geometry)}', 3857)) AND ([acqdate] > '${beginDate.toLocaleDateString()}' OR [acqdate] < '${beginDate.toLocaleDateString()}')`
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
                let features = JSON.parse(str.substring(1, str.length-1));
                return Promise.resolve(features);
            })
            .catch(err => console.log(err))
        );
    });

    return Promise.all(promiseArr);
}

export default selectRasters;
