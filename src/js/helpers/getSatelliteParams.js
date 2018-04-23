const getRawSatParams = (res) => {
    const { fields, values } = res;
    const sceneIdFieldIndex = fields.indexOf('SCENEID') !== -1 ? fields.indexOf('SCENEID') : fields.indexOf('sceneid');
    const timeFieldIndex = fields.indexOf('ACQDATE') !== -1 ? fields.indexOf('ACQDATE') : fields.indexOf('acqdate');

    return {
        imageId: values[0][sceneIdFieldIndex],
        imageDate: values[0][timeFieldIndex] ? new Date((values[0][timeFieldIndex]*1000)).toLocaleDateString() : ''
    };
}

const getSatelliteParams = (res) => {
    let promiseArr = [],
        foundLayer = {},
        rawSatParams = {};

    for (var i = 0; i < res.length; i++) {
        if (res[i].result.values.length) {
            foundLayer = res[i].layer;
            rawSatParams = getRawSatParams(res[i].result);
            break;
        }
    }

    const satelliteParams = Object.assign({}, foundLayer, rawSatParams);

    return Promise.resolve(satelliteParams);
}

export default getSatelliteParams;
