import React, { Component } from 'react';
import { zoomToFeature, getFeatureProps, getFeatureProps2, preview } from '../../helpers';
import "./icon.sass";

const Icon = ({ action, onClick, type, layerId, id, geometry }) => {
    let handler, iconClassName, path, placeHolder;

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
            path = type === 'plugin' ? './plugins/forestproject/css/icons/zoom-to-feature.svg' : './css/icons/zoom-to-feature.svg';
            placeHolder = "Z";
            break;
        case 'showPreview':
            handler = showPreview;
            iconClassName = 'gmx-icon-show-preview';
            path = type === 'plugin' ? './plugins/forestproject/css/icons/show-preview.svg' : './css/icons/show-preview.svg';
            placeHolder = "P";
            break;
        default:

    }

    return (
        <div className="gmx-table-icon-container" onClick={handler} >
            {placeHolder}
            {/*<object className="gmx-icon" type="image/svg+xml" data={path} onClick={handler} >
            </object>*/}
        </div>
    )
}

export default Icon;
