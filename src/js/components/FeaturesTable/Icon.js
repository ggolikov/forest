import React, { Component } from 'react';
import { zoomToFeature, getFeatureProps, getFeatureProps2, preview } from '../../helpers';


const Icon = ({ action, type, layerId, id, geometry }) => {
    const onZoomIconClick = (e) => {
        zoomToFeature(layerId, id, geometry);
    }

    const showPreview = (e) => {
        const state = window.store.getState();

        getFeatureProps2({ id, geometry }, state)
            .then(res => {
                preview(res, id, type);
            });
    }

    let handler, iconClassName;

    switch (action) {
        case 'zoomtoFeature':
            handler = onZoomIconClick;
            iconClassName = 'icon-eye';
            break;
        case 'showPreview':
            handler = showPreview;
            iconClassName = 'icon-forward';
            break;
        default:

    }

    return (
        <div className="feature-list-item-part" onClick={handler}>
            <i className={iconClassName}></i>
        </div>
    )
}

export default Icon;
