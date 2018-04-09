import React, { Component } from 'react';
import { zoomToFeature, getFeatureProps, getFeatureProps2, preview } from '../../helpers';
import "./icon.sass";

const Icon = ({ action, onClick, type, layerId, id, geometry }) => {
    let handler, iconClassName, path;


    const showPreview = (e) => {
        const state = window.store.getState();

        getFeatureProps2({ id, geometry }, state)
            .then(res => {
                preview(res, id, type);
            });
    }

    const onZoomIconClick = (e) => {
        zoomToFeature(layerId, id, geometry);
    }

    switch (action) {
        case 'zoomToFeature':
            handler = onZoomIconClick;
            iconClassName = 'gmx-icon-zoom-to-feature';
            path = './css/icons/zoom-to-feature.svg'
            break;
        case 'showPreview':
            handler = showPreview;
            iconClassName = 'gmx-icon-show-preview';
            path = './css/icons/show-preview.svg'
            break;
        default:

    }

    return (
        <div className="gmx-table-icon-container" onClick={handler} >
            {"CC"}
            {type}
        {/*    <object className="gmx-icon" type="image/svg+xml" data={path} >
            </object> */}
        </div>
    )
}

export default Icon;
