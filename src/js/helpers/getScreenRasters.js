import { SENTINEL_LAYER_ID } from '../constants';
import encodeParams from './encodeParams';

const getScreenRasters = (gmxMap, geometry) => {
    // TODO: implement logic of searching for layers
    // currently using default sentinel layer
    const layers = nsGmx.gmxMap.layers;

    let rasters = layers.filter(l => {
        let props = l.getGmxProperties && l.getGmxProperties();
        if (props) {
            console.log(props);
            const { Temporal, IsRasterCatalog, visible } = props;
            return Temporal && IsRasterCatalog && visible;
        }
    });

    console.log(rasters);
}

export default getScreenRasters;
