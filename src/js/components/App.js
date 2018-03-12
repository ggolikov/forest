import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import InputContainer from './InputContainer';
import SelectContainer from './SelectContainer';
import { loadFeatures } from '../helpers';
import { DEMO_LAYER_ID, FEATURES_CHUNK_SIZE } from '../constants';

class App extends Component {
    constructor(props) {
        super(props);
    }

    getFeaturesAndCount = json => {
        this.props.getFeaturesAndCount(json);
    }

    componentDidMount() {
        loadFeatures(this.props.layerId, 0, null, 'add')
            .then(json => this.getFeaturesAndCount(json));
    }

    render() {
        const { layerId, idField, idFieldIndex, featuresIds, featuresCount } = this.props;

        const firstChunkFeatures = featuresIds.filter((v, i, a) => {
            return (i <= FEATURES_CHUNK_SIZE)
        })

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
                <div style={{display: 'block'}}>
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
                    idFieldIndex={idFieldIndex}
                    layerId={layerId}
                    list={firstChunkFeatures}
                    featuresCount={featuresCount}/>
            </div>
        );
    }
}

export default App;
