import React from 'react';

const ListItem = (props) => {
    const className = props.active ? "list-item active": "list-item";

    return (
        <div className={className}
            onClick={props.onClick}
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
