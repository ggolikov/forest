import encodeParams from './encodeParams';
import { TRUE_STATUS_COLUMN_NAME } from '../constants';

const UPDATE_INTERVAL = 2000;

const sendAsyncRequest = (TaskID) => {
    const url = `${window.serverBase}AsyncTask.ashx?WrapStyle=func&TaskID=${TaskID}`;

    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            fetch(url, {
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(res => res.text())
                .then(str => {
                    const res = JSON.parse(str.substring(1, str.length-1));
                    const { Result, Status, Completed, ErrorInfo } = res.Result;

                    if (ErrorInfo) {
                        clearInterval(interval);
                        reject(res);
                    } else if (Completed) {
                        clearInterval(interval);
                        resolve(res);
                    }
                });
        }, UPDATE_INTERVAL);
    });
};

const addStatusColumn = (LayerID) => {
    let url = `${window.serverBase}Layer/GetLayerInfo.ashx?${encodeParams({LayerID})}`,
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
            const { Columns } = res.Result;
            const updatedColumns =  Columns.slice();
            const statusColumnDescription = {
                Name: TRUE_STATUS_COLUMN_NAME,
                OldName: TRUE_STATUS_COLUMN_NAME,
                ColumnSimpleType: "integer",
                IsPrimary: false,
                IsIdentity: false,
                IsComputed: false
            };

            updatedColumns.push(statusColumnDescription);

            let params = {
                VectorLayerID: LayerID,
                Columns: JSON.stringify(updatedColumns)
            },
            url = `${window.serverBase}VectorLayer/Update.ashx?`,
            options = {
                method: 'post',
                mode: 'cors',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: encodeParams(params),
                credentials: 'include'
            };

            return fetch(url, options)
                .then(res => res.text())
                .then(str => {
                    const res = JSON.parse(str.substring(1, str.length-1));
                    const { TaskID, Completed } = res.Result;
                    return sendAsyncRequest(TaskID);
                });
        })
        .catch(err => console.log(err));
}

export default addStatusColumn;
