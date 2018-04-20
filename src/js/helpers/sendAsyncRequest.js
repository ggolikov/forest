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

export default sendAsyncRequest;
