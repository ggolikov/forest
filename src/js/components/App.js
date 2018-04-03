import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import Button from './Button';
import { InputContainer } from './containers';
import { SelectContainer } from './containers';
import SelectInput from './SelectInput/index';
import LayerSelect from './LayerSelect';
import DrawingButton from './DrawingButton';
import SelectionBlock from './SelectionBlock';
import { loadFeatures, getLayersList } from '../helpers';
import { DEMO_LAYER_ID, FEATURES_CHUNK_SIZE } from '../constants';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: props.featuresIds.length === 0,
            allFeaturesChecked: props.featuresIds.every(item => item.selected),
            inputsCollapsed: false,
            listCollapsed: false
        };
    }

    componentWillReceiveProps(nextPtops) {
        const { featuresIds } = nextPtops;

        this.setState({
            loading: featuresIds.length === 0,
            allFeaturesChecked: featuresIds.every(item => item.selected)
        });
    }

    openInputsPanel = (e) => {
        this.setState({
            inputsCollapsed: !this.state.inputsCollapsed
        });
    }

    openListPanel = (e) => {
        this.setState({
            listCollapsed: !this.state.listCollapsed
        });
    }

    render() {
        const { loader, layerId, idField, idFieldIndex, featuresIds, featuresCount, attributesList, gmxMap, lmap, type } = this.props;
        const { loading, allFeaturesChecked } = this.state;

        const selectedFeaturesCount = featuresIds.filter(item => item.selected).length;
        // lazy load list
        const firstChunkFeatures = featuresIds.filter((v, i, a) => {
            return (i <= /*FEATURES_CHUNK_SIZE*/featuresCount)
        })

        const inputsPanelLabel = window._gtxt("Ввод информации");
        const listPanelLabel = window._gtxt("Список объектов");

        const layersValues = getLayersList(gmxMap);
        const loaderHolder = window._gtxt("Загрузка данных...");

        const header = window._gtxt("Отчет об использовании лесов");
        const reportTypeSelectLabel = window._gtxt("Тип отчета");
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
        const createButtonLabel = window._gtxt("Создать отчеты");

        const inputs = layerId ? (
            <div className="collapser-block">
                <div className="opening-panel" onClick={this.openInputsPanel}>
                    {inputsPanelLabel}
                </div>
                <div /*in={this.state.inputsCollapsed}*/>
                    <div>
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
                    </div>
                </div>
                <div className="opening-panel" onClick={this.openListPanel}>
                    {listPanelLabel}
                </div>
                <div /*in={this.state.listCollapsed}*/>
                    <div>
                        <DrawingButton layerId={layerId} lmap={lmap} idField={idField} />
                        <FeaturesList
                            loading={loading}
                            idFieldIndex={idFieldIndex}
                            idField={idField}
                            layerId={layerId}
                            list={firstChunkFeatures}
                            featuresCount={featuresCount}
                            type={type}
                        />
                        <SelectionBlock
                            full={allFeaturesChecked}
                            totalCount={selectedFeaturesCount}
                            selectLabel={selectAllFeaturesLabel}
                            revertLabel={revertSelectionLabel}
                        />
                    </div>
                </div>
                <Button disabled>{createButtonLabel}</Button>
            </div>
        ) : loader ? (
            <div className="forest-loader-holder">
                {loaderHolder}
            </div>
        ) : null;

        return (
            <div className="forest-plugin-container">
                <div className="forest-plugin-header">
                    <h2>{header}</h2>
                </div>
                <div className="leftContent forest-plugin-content">
                    <LayerSelect
                        values={layersValues}
                        mapValues={true}
                    />
                    {inputs}
                </div>
            </div>
        );
    }
}

export default App;
