import React from 'react';
import DrawingButton from './DrawingButton';
import './index.sass';

const GeometrySelectionPanel = (props) => {
    const selectLayerLabel = window._gtxt("Выбор слоя");
    const { layerId, lmap, idField } = props;

    return (
        <div className="gmx-geometry-select-container">
            <DrawingButton layerId={layerId} lmap={lmap} idField={idField} />
        </div>
    );
}

export default GeometrySelectionPanel;
