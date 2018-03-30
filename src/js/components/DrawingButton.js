import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { DEMO_GEOMETRY_FIELD } from '../constants';
import { changeFeaturesSelection } from '../AC';
import { selectFeaturesWithDrawing, mapFeaturesToStore } from '../helpers';

class DrawingButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            drawing: null
        };

        this.props.lmap.gmxDrawing.on('drawstop', (e) => {
            props.ondrawstop(e);
            this.clearActive();
        });
    }

    clearActive = () => {
        this.setState({
            active: false
        });
    }

    onclick = e => {
        const {lmap} = this.props,
            {active} = this.state;

        this.setState({
            active: !active
        });

        if (!active) {
            let feature = lmap.gmxDrawing.create('Polygon');
        }
    }

    render() {
        const {active} = this.state,
            txt = active ? "Полигон рисуется" : "Нарисуйте полигон";

        return (
            <Button
                active={active}
                onClick={this.onclick}
            >
                {txt}
            </Button>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ondrawstop: e => {
            const { layerId, idField } = ownProps;
            const features = e.target.getFeatures(),
                feature = features.length ? features[features.length - 1] : null,
                geometry = feature.toGeoJSON().geometry;

            selectFeaturesWithDrawing(layerId, geometry)
                .then(json => {
                    // const index = json.Result.fields.indexOf(idField);
                    // const featuresIds = json.Result.values.map(value => value[index]);
                    const index = json.Result.fields.indexOf(idField);
                    const geometryIndex = json.Result.fields.indexOf(DEMO_GEOMETRY_FIELD);
                    const featuresIds = mapFeaturesToStore(json.Result, index, geometryIndex, true);
                    dispatch(changeFeaturesSelection(featuresIds));
                    // featuresIds.forEach(id => dispatch(changeFeaturesSelection(id, true)));

                    console.log(featuresIds.length);
                });
        }
    }
}

export default connect(null, mapDispatchToProps)(DrawingButton);
// export default DrawingButton;
