import { EXPORT_PARAMS, SENTINEL_LAYER_ID } from '../constants';

const collectParams = (features) => {

    return features.map(feature => {
        const { id, attrs } = feature;
        const state = window.store.getState();
        const l = window.nsGmx.gmxMap.layersByID[SENTINEL_LAYER_ID];
        const { beginDate, endDate } = l.getDateInterval && l.getDateInterval();

        console.log(
            beginDate, endDate
        );

        let mappedParams = EXPORT_PARAMS.reduce((obj, currentItem, index, arr) => {
            let value = state[currentItem] || "";

            if (typeof value === 'object') {
                    params = Object.assign({}, params, {[param]: attrs[value.value]});
                    obj[currentItem] = attrs[value.value];
                } else {
                    obj[currentItem] = value;
                }
                return obj;
        }, {});

        mappedParams = Object.assign({}, mappedParams, {
            beginDate: beginDate / 1000,
            endDate: endDate / 1000,
            featureID: id
        });

        console.log(mappedParams);
        return mappedParams;
    });

}

export default collectParams;
