import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import InputContainer from './InputContainer';
import SelectContainer from './SelectContainer';
import { loadFeatures } from '../helpers';
import { DEMO_LAYER_ID } from '../constants';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layerID: DEMO_LAYER_ID,
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
        const header = window._gtxt("Отчет об использовании лесов");
        const reportTypeSelectLabel = window._gtxt("Выберите тип отчета");
        const reportTypeSelectValues = [
            window._gtxt("об использовании лесов"),
            window._gtxt("о восстановлении лесов")
        ];
        const organizationNameLabel = window._gtxt("Наименование организации");
        const innLabel = window._gtxt("ИНН");

        return (
            <div>
                <h2>{header}</h2>
                <div style={{display: 'none'}}>
                <SelectContainer
                    label={reportTypeSelectLabel}
                    param="reportType"
                    values={reportTypeSelectValues}
                />
                <InputContainer
                    label={organizationNameLabel}
                    param="organizationName"
                />
                <InputContainer
                    label={innLabel}
                    param="inn"
                />
                </div>
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
