import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import InputContainer from './InputContainer';
import { loadFeatures } from '../helpers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layerID: '4BD64872924B48D9876EFB9E9A1B7C71',
            idField: 'ogc_fid',
            featuresCount: 0,
            features: {
                fields: [],
                types: [],
                values: []
            }
        };
    }

    componentDidMount() {
        loadFeatures(this.state.layerID, 0, 500, 'add')
            .then(json => {
                this.setState({features: json.Result, featuresCount: json.Result.Count})
            });
    }

    render() {
        const { layerID, idField, features, featuresCount } = this.state;
        const header = window._gtxt('Отчет об использовании лесов');

        return (
            <div>
                <h2>{header}</h2>
                <InputContainer
                    param="organizationName"
                />
                <InputContainer
                    param="inn"
                />
                <FeaturesList
                    layerID={layerID}
                    idField={idField}
                    features={features}
                    featuresCount={featuresCount}/>
            </div>
        );
    }
}

export default App;
