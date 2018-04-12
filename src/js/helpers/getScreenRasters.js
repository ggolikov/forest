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
    }).sort((a, b) => {
            let oa = a.options, ob = b.options,
                za = (oa.zIndexOffset || 0) + (oa.zIndex || 0),
                zb = (ob.zIndexOffset || 0) + (ob.zIndex || 0);
            return za - zb;
        });
    // console.log(rasters);
}

export default getScreenRasters;
