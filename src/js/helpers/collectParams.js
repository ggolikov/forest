import { EXPORT_PARAMS, SENTINEL_LAYER_ID } from '../constants';
import objectAssign from 'object-assign';

const collectParams = (features) => {

    return features.map(feature => {
        const { id, attrs } = feature;
        const state = window.store.getState();

        let mappedParams = EXPORT_PARAMS.reduce((obj, currentItem, index, arr) => {
            let value = state[currentItem] || "";

            if (typeof value === 'object') {
                    obj[currentItem] = attrs[value.value];
                } else {
                    obj[currentItem] = value;
                }
                return obj;
        }, {});

        const satLayersWithDates = state.satLayers.map(layer => {
            const l = nsGmx.gmxMap.layersByID[layer.layerId];
            const { beginDate, endDate } = l.getDateInterval && l.getDateInterval();
            const dateInterval = {
                beginDate: Number(beginDate) / 1000,
                endDate: Number(endDate) / 1000
            };

            return objectAssign({}, layer, dateInterval);
        });


        mappedParams = objectAssign({}, mappedParams, {
            featureID: id,
            satLayers: satLayersWithDates
        });

        return mappedParams;
    });

}

export default collectParams;
