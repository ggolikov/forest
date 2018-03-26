var nsGmx = nsGmx || {};
nsGmx.Utils = nsGmx.Utils || {};
    {
        TinyReference: {
            create: function(data, tempFlag) {


                var def = $.Deferred();
                    sendCrossDomainPostRequest(serverBase + "TinyReference/Create.ashx", {
                        WrapStyle: 'message',
                        content: JSON.stringify(data),
                        temp: tempFlag
                    },
                    function(response) {
                        if (parseResponse(response)) {
                            def.resolve(response.Result);
                        } else {
                            def.reject();
                        }
                    })

                    return fetch(`${window.serverBase}TinyReference/Create.ashx`)
                        .then(res => res.text())
                        .then(str => {
                            let link = JSON.parse(str.substring(1, str.length-1));
                            return Promise.resolve(link);
                    })

        return def.promise();
    },
