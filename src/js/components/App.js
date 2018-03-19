import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import InputContainer from './InputContainer';
import SelectContainer from './SelectContainer';
import SelectInput from './SelectInput';
import LayerSelect from './LayerSelect';
import CheckboxContainer from './CheckboxContainer';
import { loadFeatures, getLayersList } from '../helpers';
import { DEMO_LAYER_ID, FEATURES_CHUNK_SIZE } from '../constants';

class App extends Component {
    constructor(props) {
        super(props);

        console.log(getLayersList(props.gmxMap));

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
        const { layerId, idField, idFieldIndex, featuresIds, featuresCount, attributesList, gmxMap } = this.props;
        const { loading, allFeaturesChecked } = this.state;
        // lazy load list
        const firstChunkFeatures = featuresIds.filter((v, i, a) => {
            return (i <= /*FEATURES_CHUNK_SIZE*/featuresCount)
        })

        const layersValues = getLayersList(gmxMap);

        const header = window._gtxt("Отчет об использовании лесов");
        const reportTypeSelectLabel = window._gtxt("Выберите тип отчета");
        const reportTypeSelectValues = [
            window._gtxt("об использовании лесов"),
            window._gtxt("о восстановлении лесов")
        ];
        const organizationNameLabel = window._gtxt("Наименование организации");
        const innLabel = window._gtxt("ИНН");
        const regionLabel = window._gtxt("Субъект Российской Федерации");
        const forestryLabel = window._gtxt("Лесничество");
        const sectionForestryLabel = window._gtxt("Участковое лесничество");
        const quadrantLabel = window._gtxt("Квартал");
        const stratumLabel = window._gtxt("Выдел");
        const revertSelectionLabel = window._gtxt("Инвертировать выделение");
        const selectAllFeaturesLabel = window._gtxt("Выделить все");

        return (
            <div>
                <h2>{header}</h2>
                <LayerSelect
                    values={layersValues}
                    mapValues={true}
                />
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
                <div style={{display: 'none'}}>
                    <SelectInput
                        label={regionLabel}
                        param="region"
                        selectValues={attributesList}
                        loading={loading}
                    />
                    <SelectInput
                        label={forestryLabel}
                        param="forestry"
                        selectValues={attributesList}
                        loading={loading}
                    />
                    <SelectInput
                        label={sectionForestryLabel}
                        param="sectionForestry"
                        selectValues={attributesList}
                        loading={loading}
                    />
                    <SelectInput
                        label={quadrantLabel}
                        param="quadrant"
                        selectValues={attributesList}
                        loading={loading}
                    />
                    <SelectInput
                        label={stratumLabel}
                        param="stratum"
                        selectValues={attributesList}
                        loading={loading}
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
            </div>
        );
    }
}

export default App;
