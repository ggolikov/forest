import React, { Component } from 'react';
import { zoomToFeature } from '../helpers';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    onItemClick = (e) => {
        const { layerID, id, idField } = this.props;

        zoomToFeature(layerID, id, idField)
    }

    onMouseEnter = (e) => {
        this.setState({
            active: true
        });
    }

    onMouseLeave = (e) => {
        this.setState({
            active: false
        });
    }

    render() {
        const { active } = this.state;

        const className = active ? "gmx-list-item active": "gmx-list-item";

        return (
            <div className={className}
                onClick={this.onItemClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <span className="listSpan">
                    {this.props.txt}
                </span>
            </div>
        )
    }
}

export default ListItem;
