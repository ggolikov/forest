import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import Button from '../Button';
import { collectParams, makeReport, addStatusColumn, updateObjects } from '../../helpers';
import { TRUE_STATUS_COLUMN_NAME } from '../../constants';
import { setAttributesList, updateFeatures } from '../../AC';
import './index.sass';

class MakeReportButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: false
        }
    }

    changeFeaturesStatus = (features) => {
        const state = window.store.getState();

        const { layerId, attributesList } = state;
        const selectedFeatures = features.filter(item => item.selected);
        const objectsToUpdate = selectedFeatures
            .map(item => {
                return {
                    action: "update",
                    id: item.id,
                    properties: {
                        [TRUE_STATUS_COLUMN_NAME]: 2
                    }
                }
            });

        const hasStatusAttribute = attributesList.find(v => v === TRUE_STATUS_COLUMN_NAME);

        if (hasStatusAttribute) {
            updateObjects(layerId, objectsToUpdate)
                .then(res => {
                    const updatedFeatures = selectedFeatures.map(feature => {
                        feature.status = 2;
                        return feature;
                    });
                    window.store.dispatch(updateFeatures(updatedFeatures));
                });
        } else {
            addStatusColumn(layerId)
                .then(res => {
                    const updatedAttributesList = attributesList.slice();
                    updatedAttributesList.push(TRUE_STATUS_COLUMN_NAME);
                    window.store.dispatch(setAttributesList(updatedAttributesList));
                    updateObjects(layerId, objectsToUpdate)
                        .then(res => {
                            const updatedFeatures = selectedFeatures.map(feature => {
                                feature.status = 2;
                                return feature;
                            });
                            window.store.dispatch(updateFeatures(updatedFeatures));
                        });
                });
        }
    }

    onClick = () => {
        this.setState({
            isLoading: true,
            error: false
        });

        const { features } = this.props;
        let reportParams = collectParams(features);
        console.log(reportParams);
        makeReport(reportParams)
            .then(res => {
                this.changeFeaturesStatus(features);
                this.setState({
                    isLoading: false,
                    error: false
                });
            })
            .catch(res => {
                this.setState({
                    isLoading: false,
                    error: true
                });
            });
    }

    render() {
        const { isLoading, error } = this.state;

        let buttonLabel;

        if (isLoading) {
            buttonLabel =
                (<BeatLoader
                    color={'#70cbe0'}
                    loading={isLoading}
                 />)
        } else if (error) {
            buttonLabel = 'ошибка';
        } else {
            buttonLabel = this.props.children;
        }

        return (
            <div className="gmx-button-container">
                <Button
                    disabled={isLoading}
                    className={`gmx-sidebar-button${error ? '-error' : ''}`}
                    onClick={this.onClick}
                >
                    {buttonLabel}
                </Button>
            </div>
        );
    }
}

export default MakeReportButton;
