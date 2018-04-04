import React from 'react';
import { SelectContainer } from '../containers';
import './index.sass';

const LayerSelectPanel = (props) => {
    const selectLayerLabel = window._gtxt("Выбор слоя");

    return (
        <div className="gmx-select-layer-container">
            <span className="gmx-select-layer-container__label">
                {selectLayerLabel}
            </span>
            <SelectContainer
                {...props}
                size="medium"
                param="layerId"
            />
        </div>
    );
}

export default LayerSelectPanel;
