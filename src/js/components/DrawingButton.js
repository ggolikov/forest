import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { replacePoints } from '../AC';
import parseGeoJSON from '../helpers/parseGeoJSON';

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
            active: false,
        });
    }

    onclick = e => {
        const {lmap} = this.props,
            {active} = this.state;

        this.setState({
            active: !active
        });

        if (!active) {
            let feature = lmap.gmxDrawing.create('Polyline', {maxPoints: 5});
        }

    }

    render() {
        const {active} = this.state,
            txt = active ? "Линия рисуется" : "Нарисуйте линию";

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


const mapStateToProps = (state) => {
    return {
        points: state.points
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ondrawstop: e => {
            const features = e.target.getFeatures(),
                feature = features.length ? features[features.length - 1] : null,
                geoJSON = feature.toGeoJSON(),
                parsed = parseGeoJSON(geoJSON);

            dispatch(replacePoints(parsed));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingButton);
// export default DrawingButton;
