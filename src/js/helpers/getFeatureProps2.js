import { EXPORT_PARAMS } from '../constants';
import selectRasters from './selectRasters';
import getSatelliteParams from './getSatelliteParams';
import getAttribute from './getAttribute';
import objectAssign from 'object-assign';

const getFeatureProps2 = (feature, state) => {
    const { id, geometry } = feature;

    return selectRasters(nsGmx.gmxMap, geometry, state)
        .then(res => getSatelliteParams(res))
        .then(res => {
            const satParams = res;
            let params = {};
            const { featuresIds } = state;
            const { attrs } = (featuresIds.filter(f => f.id === id))[0];

            EXPORT_PARAMS.forEach(param => {
                let value = state[param] || "";

                if (typeof value === 'object') {
                    params = objectAssign({}, params, {[param]: attrs[value.value]});
                } else {
                    params = objectAssign({}, params, {[param]: value});
                }
            });

            return new Promise((resolve, reject) => {
                resolve(objectAssign({}, satParams, params));
            })
        });
}

export default getFeatureProps2;
