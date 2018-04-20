import getTopRaster from './getTopRaster';

const setTopVisibleRaster = (/*gmxMap*/) => {
    let layers = nsGmx.gmxMap.layers,
        topRaster;

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
                topRaster = getTopRaster(layers);
            }
        }
        console.log(topRaster && topRaster.getGmxProperties().title);
    });
}

export default setTopVisibleRaster;
