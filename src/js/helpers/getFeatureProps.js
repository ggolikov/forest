import { EXPORT_PARAMS } from '../constants';
import selectRasters from './selectRasters';
import getSatelliteParams from './getSatelliteParams';
import getAttribute from './getAttribute';
import objectAssign from 'object-assign';

const getFeatureProps = (feature, state) => {
    const { id, geometry } = feature;

    return selectRasters(nsGmx.gmxMap, geometry)
        .then(res => getSatelliteParams(res))
        .then(res => {
            const satParams = res[0];
            const { layerId, idField } = state;
            let promiseArr = [Promise.resolve(satParams)];

            EXPORT_PARAMS.forEach(param => {
                let value = state[param] || "";

                if (typeof value === 'object') {
                    promiseArr.push(getAttribute(layerId, idField, id, param, value));
                } else {
                    promiseArr.push(Promise.resolve({ [param]: value }));
                }
            });

            return Promise.all(promiseArr);
        })
        .then(res => {
            return new Promise((resolve, reject) => {
                resolve(objectAssign({}, ...res));
            })
        });
}

export default getFeatureProps;
