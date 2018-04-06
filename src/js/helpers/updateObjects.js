import encodeParams from './encodeParams';
const updateObjects = (layerId, features) => {
    const params = {
        LayerName : layerId,
        Objects: JSON.stringify(features)
    },
    url = `${window.serverBase}VectorLayer/ModifyVectorObjects.ashx?${encodeParams(params)}`,
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
            let res = JSON.parse(str.substring(1, str.length-1));
            return Promise.resolve(res);
        })
        .catch(err => console.log(err));
}

export default updateObjects;
