const mapRastersToHash = (array) => {
    return array.map(l => {
        const layerId = l.getGmxProperties().name;

        return {
            layerId: layerId,
            type: "оптическая",
            system: "Sentinel-2",
            resolution: "10 м"
        }
    });
}

export default mapRastersToHash;
