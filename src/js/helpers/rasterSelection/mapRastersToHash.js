import objectAssign from 'object-assign';

import getRasterParams from './getRasterParams';

const mapRastersToHash = (array) => {
    return array.map(l => {
        const layerId = l.getGmxProperties().name;

        return objectAssign({}, {layerId}, getRasterParams(layerId));
    });
}

export default mapRastersToHash;
