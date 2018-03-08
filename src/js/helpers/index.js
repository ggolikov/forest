const nsGmx = window.nsGmx || {};
window.serverBase = 'http://maps.kosmosnimki.ru/';

/**
 * Запрос за объектами слоя
 * VectorLayer/Search.ashx
 * https://docs.google.com/document/d/1Dky3Lg8WIiHREYln0zVgUqfpHFptlolCZ_i8aB0Iljw/edit#heading=h.t355wryw7p1x
 */
export const loadFeatures = (layerId) => {
    const params = {
            layer: layerId,
            count: 'add',
            page: 0,
            pagesize: 500,
            geometry: true
        },
        url = `${window.serverBase}VectorLayer/Search.ashx?${encodeParams(params)}`,
        options = {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        }

    return fetch(url, options)
        .then(res => res.text())
        .then(str => {
            let features = JSON.parse(str.substring(1, str.length-1));
            return Promise.resolve(features);
        })
        .catch(err => console.log(err));
}

export const encodeParams = (obj) => {
    return Object.keys(obj).map(function(key) {
        return key + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}
