import encodeParams from './encodeParams';

const getAttribute = (layerId, idField, featureId, param, value) => {
    const params = {
        layer: layerId,
        page: 0,
        pagesize: 500,
        count: false,
        query: `[${idField}]='${featureId}'`
    },
    url = `${window.serverBase}VectorLayer/Search.ashx?${encodeParams(params)}`,
    options = {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    };

    return fetch(url, options)
        .then(res => res.text())
        .then(str => {
            const res = JSON.parse(str.substring(1, str.length-1));
            const { fields, values } = res.Result;
            const index = fields.indexOf(value.value);

            return Promise.resolve({ [param]: values[0][index] });
        })
        .catch(err => console.log(err));
}

export default getAttribute;