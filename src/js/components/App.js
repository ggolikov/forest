import React, { Component } from 'react';
import InputContainer from './InputContainer';
import CheckboxContainer from './CheckboxContainer';
import FeaturesList from './FeaturesList';
import { loadFeatures } from '../helpers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layerID: '4BD64872924B48D9876EFB9E9A1B7C71',
            idFieid: 'ogc_fid',
            features: []
        };
    }

    componentDidMount() {
        loadFeatures(this.state.layerID)
            .then(json => {
                this.setState({features: json.Result})
            });
    }

    render() {
        let { features, idFieid } = this.state;
        console.log(features);
        return (
            <div>
                <h2>Введите координаты</h2>
                <FeaturesList features={features} idFieid={idFieid}/>
            </div>
        );
    }
}
export default App;
