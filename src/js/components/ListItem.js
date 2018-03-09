import React from 'react';
import { zoomToFeature } from '../helpers';

const ListItem = (props) => {
    const { layerID, id, idField, features, featuresCount } = props;
    const className = props.active ? "list-item active": "list-item";

    const onFeatureClick = (e) => {
        zoomToFeature(layerID, id, idField)
    }

    return (
        <div className={className}
            onClick={onFeatureClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <span className="listSpan">
                {props.txt}
            </span>
        </div>
    )
}

export default ListItem;
