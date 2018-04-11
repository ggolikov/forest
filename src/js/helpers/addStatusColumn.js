import encodeParams from './encodeParams';
import { TRUE_STATUS_COLUMN_NAME } from '../constants';

const addStatusColumn = (layerId) => {
    const params = {
        SourceName: layerId
    },
    url = `${window.serverBase}VectorLayer/GetTableColumns.ashx?${encodeParams(params)}`,
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
            console.log(res.Result);
            // const { fields, values } = res.Result;
            // const index = fields.indexOf(value.value);

            // return Promise.resolve({ [param]: values[0][index] });
        })
        .catch(err => console.log(err));
}

export default addStatusColumn;
