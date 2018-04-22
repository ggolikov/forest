import getRasterParams from './getRasterParams';

const mapRastersToHash = (array) => {
    return array.map(l => {
        const layerId = l.getGmxProperties().name;
        
        return Object.assign({}, {layerId}, getRasterParams(layerId));
    });
}

export default mapRastersToHash;
