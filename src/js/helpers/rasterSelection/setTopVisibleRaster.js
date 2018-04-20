import sortRasters from './sortRasters';
import mapRastersToHash from './mapRastersToHash';
import { setSatelliteLayer } from '../../AC';

const setTopVisibleRaster = (/*gmxMap*/) => {
    let layers = nsGmx.gmxMap.layers,
        sortedRasters;

    let filteredLayers = layers.filter(l => {
        let props = l.getGmxProperties && l.getGmxProperties();
        if (props) {
            const { Temporal, IsRasterCatalog } = props;
            return Temporal && IsRasterCatalog;
        }
    });

    let rastersHash = filteredLayers.reduce((obj, currentItem, index, arr) => {
        let layerID = currentItem.getGmxProperties().name;

        obj[layerID] = true;
            return obj;
    }, {});

    nsGmx.leafletMap.on('layeradd layerremove', function(event) {
        let layer = event.layer,
            props = layer.getGmxProperties && layer.getGmxProperties();

        if (props) {
            let layerID = props.name;

            if (layerID in rastersHash) {
                sortedRasters = sortRasters(layers);
                window.store.dispatch(setSatelliteLayer(mapRastersToHash(sortedRasters)));
            }
        }
    });

    sortedRasters = sortRasters(layers);
    window.store.dispatch(setSatelliteLayer(mapRastersToHash(sortedRasters)));
}

export default setTopVisibleRaster;
