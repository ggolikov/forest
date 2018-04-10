const downloadFile = (url) => {
    let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
        isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    if (isChrome || isSafari) {
        let link = document.createElement('a');

        link.href = url;
        link.download = 'report';

        if (document.createEvent) {
            let e = document.createEvent('MouseEvents');

            e.initEvent('click', true, true);
            link.dispatchEvent(e);

            return true;
        }
    } else {
        window.open(url, '_self');
    }
}

export default downloadFile;
