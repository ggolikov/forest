import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
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
        let { layerID, idField, features, featuresCount } = this.state;

        return (
            <div>
                <h2>Отчет об использовании лесов</h2>
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
