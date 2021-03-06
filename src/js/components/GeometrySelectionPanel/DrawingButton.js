import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import { updateFeatures } from '../../AC';
import { selectFeaturesWithDrawing, mapFeaturesToStore } from '../../helpers';

class DrawingButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            drawing: null
        };

        this.props.lmap.gmxDrawing.on('drawstop', (e) => {
            console.log(e);
            props.ondrawstop(e);
            this.setState({
                drawing: e.object
            });
            this.clearActive();
        });
    }

    clearActive = () => {
        this.setState({
            active: false
        });
    }

    onclick = e => {
        const { lmap } = this.props,
            { active, drawing } = this.state;

        lmap.gmxDrawing.remove(drawing);

        this.setState({
            active: !active,
            drawing: null
        });

        if (!active) {
            let feature = lmap.gmxDrawing.create('Polygon');
        }
    }

    render() {
        const {active} = this.state,
            txt = active ? "Полигон рисуется" : "Выделите участки полигоном";

        return (
            <Button
                className= { active ? "gmx-sidebar-button-toggled" : "gmx-sidebar-button"}
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
                    const index = json.Result.fields.indexOf(idField);
                    const featuresIds = mapFeaturesToStore(json.Result, index, true);
                    dispatch(updateFeatures(featuresIds));
                });
        }
    }
}

export default connect(null, mapDispatchToProps)(DrawingButton);
// export default DrawingButton;
