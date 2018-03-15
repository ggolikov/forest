import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import InputContainer from './InputContainer';
import SelectContainer from './SelectContainer';
import SelectInput from './SelectInput';
import CheckboxContainer from './CheckboxContainer';
import { loadFeatures } from '../helpers';
import { DEMO_LAYER_ID, FEATURES_CHUNK_SIZE } from '../constants';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: props.featuresIds.length === 0,
            allFeaturesChecked: props.featuresIds.every(item => item.selected)
        };
    }

    componentWillReceiveProps(nextPtops) {
        const { featuresIds } = nextPtops;

        this.setState({
            loading: featuresIds.length === 0,
            allFeaturesChecked: featuresIds.every(item => item.selected)
        });
    }

    getFeaturesAndCount = json => {
        this.props.getFeaturesAndCount(json);
    }

    componentDidMount() {
        loadFeatures(this.props.layerId, 0, null, 'add')
            .then(json => this.getFeaturesAndCount(json));
    }

    render() {
        const { layerId, idField, idFieldIndex, featuresIds, featuresCount, attributesList } = this.props;
        const { loading, allFeaturesChecked } = this.state;
        // lazy load list
        const firstChunkFeatures = featuresIds.filter((v, i, a) => {
            return (i <= /*FEATURES_CHUNK_SIZE*/featuresCount)
        })

        const header = window._gtxt("Отчет об использовании лесов");
        const reportTypeSelectLabel = window._gtxt("Выберите тип отчета");
        const reportTypeSelectValues = [
            window._gtxt("об использовании лесов"),
            window._gtxt("о восстановлении лесов")
        ];
        const organizationNameLabel = window._gtxt("Наименование организации");
        const innLabel = window._gtxt("ИНН");
        const revertSelectionLabel = window._gtxt("Инвертировать выделение");
        const selectAllFeaturesLabel = window._gtxt("Выделить все");

        return (
            <div>
                <h2>{header}</h2>
                <div style={{display: 'none'}}>
                <SelectContainer
                    label={reportTypeSelectLabel}
                    param="reportType"
                    values={reportTypeSelectValues}
                />
                <SelectContainer
                    loading={loading}
                    values={attributesList}
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
                <SelectInput
                    label="dssdsd"
                    inputParam="organizationName"
                    selectParam="reportType"
                    selectValues={attributesList}
                />
                <CheckboxContainer
                    param="selectAllFeatures"
                    checked={allFeaturesChecked}
                    label={selectAllFeaturesLabel}
                />
                <CheckboxContainer
                    param="revertSelection"
                    defaultChecked={false}
                    label={revertSelectionLabel}
                />
                <FeaturesList
                    loading={loading}
                    idFieldIndex={idFieldIndex}
                    idField={idField}
                    layerId={layerId}
                    list={firstChunkFeatures}
                    featuresCount={featuresCount}/>
            </div>
        );
    }
}

export default App;
