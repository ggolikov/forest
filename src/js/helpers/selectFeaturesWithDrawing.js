import encodeParams from './encodeParams';

const selectFeaturesWithDrawing = (layerId, geometry) => {
    const params = {
        layer: layerId,
        page: 0,
        pagesize: null,
        geometry: true,
        query: `STIntersects([gmx_geometry], GeometryFromGeoJson('${JSON.stringify(geometry)}', 4326))`
    },
    url = `${window.serverBase}VectorLayer/Search.ashx?${encodeParams(params)}`,
    options = {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    };
    console.log(url);
    return fetch(url, options)
            .then(res => {
                return res.text();
            })
            .then(str => {
                let features = JSON.parse(str.substring(1, str.length-1));
                return Promise.resolve(features);
            })
            .catch(err => console.log(err))
}

export default selectFeaturesWithDrawing;
