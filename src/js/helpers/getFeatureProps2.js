import { EXPORT_PARAMS } from '../constants';
import selectRasters from './selectRasters';
import getSatelliteParams from './getSatelliteParams';
import getAttribute from './getAttribute';

const getFeatureProps2 = (feature, state) => {
    const { id, geometry } = feature;

    return selectRasters(nsGmx.gmxMap, geometry, state)
        .then(res => getSatelliteParams(res))
        .then(res => {
            const satParams = res[0];
            let params = {};
            const { featuresIds } = state;
            const { attrs } = (featuresIds.filter(f => f.id === id))[0];

            EXPORT_PARAMS.forEach(param => {
                let value = state[param] || "";

                if (typeof value === 'object') {
                    params = Object.assign({}, params, {[param]: attrs[value.value]});
                } else {
                    params = Object.assign({}, params, {[param]: value});
                }
            });

            return new Promise((resolve, reject) => {
                resolve(Object.assign({}, satParams, params));
            })
        });
}

export default getFeatureProps2;
