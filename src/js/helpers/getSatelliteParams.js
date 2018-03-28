const getSatelliteParams = (res) => {
    let promiseArr = [];

    res.forEach(r => {
        const sceneIdField = "sceneid";
        const dateIdField = "acqdate";
        const { fields, values } = r.Result;
        const satelliteParams = {
            type: "оптическая",
            system: "Sentinel-2",
            resolution: "",
            imageId: values[0][fields.indexOf(sceneIdField)],
            imageDate: new Date(values[0][fields.indexOf(dateIdField)]*1000).toLocaleDateString()
        };
        promiseArr.push(Promise.resolve(satelliteParams))
    });

    return Promise.all(promiseArr);
}

export default getSatelliteParams;
