import React, { Component } from 'react';
import FeaturesList from './FeaturesList';
import Button from './Button';
import Label from './Label';
import SqlEditor from './SqlEditor';
import CountPanel from './CountPanel';
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
import labels from './labels';
import values from './values';

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
        const { reportType, loader, layerId, idField, idFieldIndex, featuresIds, featuresCount, attributesList, gmxMap, lmap, type } = this.props;
        const { loading, allFeaturesChecked } = this.state;

        const selectedFeatures = featuresIds.filter(item => item.selected);
        const selectedFeaturesCount = selectedFeatures.length;
        // lazy load list
        const firstChunkFeatures = featuresIds.filter((v, i, a) => {
            return (i <= /*FEATURES_CHUNK_SIZE*/featuresCount)
        })

        const layersValues = getLayersList(gmxMap);
        const layer = window.nsGmx.gmxMap.layersByID[layerId];
        const layerName = layer && layer.getGmxProperties && layer.getGmxProperties().name;
        const layersWithoutMain = layersValues.filter(name => {
            return name !== layerName;
        });
        const loaderHolder = window._gtxt("Загрузка данных...");

        const reportTypeAdditionParams = reportType === window._gtxt("об использовании лесов") ?
        (
            <div>
                <SelectContainer
                    label={labels.fellingFormLabel}
                    param="fellingForm"
                    values={values.fellingFormValues}
                />
                <SelectContainer
                    label={labels.fellingTypeLabel}
                    param="fellingType"
                    values={values.fellingTypeValues}
                />
            </div>
        ) : (
            <SelectContainer
                label={labels.recoveryEventTypeLabel}
                param="recoveryEventType"
                values={values.recoveryEventTypes}
            />
        )

        const inputs = layerId ? (
            <div>
                <Label  size="medium">
                    {labels.inputsPanelLabel}
                </Label>
                <div>
                    <div>
                        {/*<SqlEditor>
                        </SqlEditor>*/}
                        <SelectContainer
                            label={labels.reportTypeSelectLabel}
                            param="reportType"
                            values={values.reportTypeSelectValues}
                        />
                        {reportTypeAdditionParams}
                        <InputContainer
                            label={labels.organizationNameLabel}
                            param="organizationName"
                        />
                        <InputContainer
                            label={labels.innLabel}
                            param="inn"
                        />
                        <SelectInput
                            label={labels.regionLabel}
                            param="region"
                            selectValues={attributesList}
                            loading={loading}
                        />
                        <SelectInput
                            label={labels.forestryLabel}
                            param="forestry"
                            selectValues={attributesList}
                            loading={loading}
                        />
                        <SelectInput
                            label={labels.sectionForestryLabel}
                            param="sectionForestry"
                            selectValues={attributesList}
                            loading={loading}
                        />
                        <SelectInput
                            label={labels.quadrantLabel}
                            param="quadrant"
                            selectValues={attributesList}
                            loading={loading}
                        />
                        <SelectInput
                            label={labels.stratumLabel}
                            param="stratum"
                            selectValues={attributesList}
                            loading={loading}
                        />
                        <SelectInput
                            label={labels.siteLabel}
                            param="site"
                            selectValues={attributesList}
                            loading={loading}
                        />
                        <SelectContainer
                            label={labels.quadrantLayerSelectLabel}
                            param="quadrantLayerId"
                            values={layersWithoutMain}
                            mapValues={true}
                        />
                    </div>
                </div>
                <Label  size="medium">
                    {labels.listPanelLabel}
                </Label>
                <div className="forest-features-block">
                    <div>
                        <GeometrySelectionPanel layerId={layerId} lmap={lmap} idField={idField} />
                        <Label  size="medium">
                            {`Выделено: ${selectedFeaturesCount} / ${featuresCount}`}
                        </Label>
                        <Label  size="small">
                            <CheckboxContainer
                                param="revertSelection"
                                defaultChecked={false}
                                label={labels.revertSelectionLabel}
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
                    {labels.createButtonLabel}
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
                    {labels.header}
                </div>
                <CountPanel />
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
