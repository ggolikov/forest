import React from 'react';
import SelectContainer from './SelectContainer';

const LayerSelect = (props) => {
    const { values } = props;
    const selectLayerLabel = window._gtxt("Выберите слой");

    return (
        <SelectContainer
            {...props}
            label={selectLayerLabel}
            param="layerId"
        />
    );
}

export default LayerSelect;
