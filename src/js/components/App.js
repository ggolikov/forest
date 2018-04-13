import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import Button from './Button';
import Label from './Label';
import { InputContainer, SelectContainer, CheckboxContainer } from './containers';
import SelectInput from './SelectInput/index';
import GeometrySelectionPanel from './GeometrySelectionPanel';
import FeaturesTable from './FeaturesTable/index';
import LayerSelectPanel from './LayerSelectPanel';
import SelectionPanel from './SelectionPanel';
import StatusChangePanel from './StatusChangePanel';
import MakeReportButton from './MakeReportButton';
import { getLayersList } from '../helpers';
import { FEATURES_CHUNK_SIZE } from '../constants';

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
        const { layerId, featuresIds } = nextPtops;
        const selectFeature = this.props.selectFeature.bind(this);

        if (layerId) {
            const layer = window.nsGmx.gmxMap.layersByID[layerId];

            layer.on('click', function (e) {
                if (e.originalEvent.altKey) {
                    selectFeature(e);
                }
            });
        }

        this.setState({
            loading: featuresIds.length === 0,
            allFeaturesChecked: featuresIds.every(item => item.selected)
        });
    }

    render() {
        const { loader, layerId, idField, idFieldIndex, featuresIds, featuresCount, attributesList, gmxMap, lmap, type } = this.props;
        const { loading, allFeaturesChecked } = this.state;

        const selectedFeatures = featuresIds.filter(item => item.selected);
        const selectedFeaturesCount = selectedFeatures.length;
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
        const clearSelectionLabel = window._gtxt("Снять выделение");
        const selectAllFeaturesLabel = window._gtxt("Выделить все");
        const createButtonLabel = window._gtxt("Создать отчеты");

        const inputs = layerId ? (
            <div className="collapser-block">
                <Label  size="medium">
                    {inputsPanelLabel}
                </Label>
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
                <Label  size="medium">
                    {listPanelLabel}
                </Label>
                <div /*in={this.state.listCollapsed}*/>
                    <div>
                        <GeometrySelectionPanel layerId={layerId} lmap={lmap} idField={idField} />
                        <Label  size="medium">
                            {`Выделено: ${selectedFeaturesCount} / ${featuresCount}`}
                        </Label>
                        <Label  size="small">
                            <CheckboxContainer
                                param="revertSelection"
                                defaultChecked={false}
                                label={revertSelectionLabel}
                            />
                        </Label>
                        <FeaturesTable
                            full={allFeaturesChecked}
                            loading={loading}
                            idFieldIndex={idFieldIndex}
                            idField={idField}
                            layerId={layerId}
                            list={firstChunkFeatures}
                            featuresCount={featuresCount}
                            selectedFeaturesCount={selectedFeaturesCount}
                            type={type}
                        />
                        <StatusChangePanel
                            disabled={selectedFeaturesCount === 0}
                            layerId={layerId}
                        />
                    </div>
                </div>
                <MakeReportButton features={selectedFeatures}>
                    {createButtonLabel}
                </MakeReportButton>
            </div>
        ) : loader ? (
            <div className="forest-loader-holder">
                {loaderHolder}
            </div>
        ) : null;

        return (
            <div className="forest-plugin-container">
                <div className="forest-plugin-header">
                    {header}
                </div>
                <LayerSelectPanel
                    values={layersValues}
                    mapValues={true}
                />
                <div className="leftContent forest-plugin-content">
                    {inputs}
                </div>
            </div>
        );
    }
}

export default App;
