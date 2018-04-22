const getRasterParams = (layerId) => {

    if (layerId === '636CBFF5155F4F299254EAF54079040C') {
        return {
            layerId: layerId,
            type: "оптическая",
            system: "Sentinel-2",
            resolution: "10 м"
        }
    } else if (layerId === '47A9D4E5E5AE497A8A1A7EA49C7FC336') {
        return {
            layerId: layerId,
            type: "оптическая",
            system: "Landsat-8",
            resolution: "15 м"
        }
    } else {
        return {};
    }
}

export default getRasterParams;
