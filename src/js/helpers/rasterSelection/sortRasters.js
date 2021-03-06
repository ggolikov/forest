const sortRasters = (layers) => {
    layers = layers || nsGmx.gmxMap.layers;

    return layers.filter(l => {
        let props = l.getGmxProperties && l.getGmxProperties();
        if (props) {
            const { Temporal, IsRasterCatalog, visible } = props;
            return Temporal && IsRasterCatalog && visible;
        }
    }).sort((a, b) => {
            let oa = a.options, ob = b.options,
                za = (oa.zIndexOffset || 0) + (oa.zIndex || 0),
                zb = (ob.zIndexOffset || 0) + (ob.zIndex || 0);
            return zb - za;
    });
}

export default sortRasters;
