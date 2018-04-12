import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import Button from '../Button';
import { TRUE_STATUS_COLUMN_NAME, STATUS_COLUMN_NAME } from '../../constants';
import { addStatusColumn, updateObjects } from '../../helpers';
import { setAttributesList, updateFeatures } from '../../AC';

const StatusChangeButton = (props) => {
     let buttonLabel = !props.isLoading ?
        window._gtxt("установить статус") :
        <BeatLoader
            color={'#70cbe0'}
            loading={props.isLoading}
        />;

    return (
        <Button
            disabled={props.isLoading}
            className="gmx-addon-button-medium"
            onClick={props.onClick}
        >
            {buttonLabel}
        </Button>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        state
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { id, callback } = ownProps;

    return {
        ...ownProps,
        onClick: () => {
            const { layerId, code } = ownProps;
            const { state } = stateProps;
            const { attributesList } = state;
            const { featuresIds } = state;
            const selectedFeatures = featuresIds.filter(item => item.selected);
            const objectsToUpdate = selectedFeatures
                .map(item => {
                    return {
                        action: "update",
                        id: item.id,
                        properties: {
                            [TRUE_STATUS_COLUMN_NAME]: code
                        }
                    }
                });

            const hasStatusAttribute = attributesList.find(v => v === TRUE_STATUS_COLUMN_NAME);

            ownProps.toggleLoading(true);

            if (hasStatusAttribute) {
                updateObjects(layerId, objectsToUpdate)
                    .then(res => {
                        const updatedFeatures = selectedFeatures.map(feature => {
                            feature.status = code;
                            return feature;
                        });
                        dispatch(updateFeatures(updatedFeatures));
                        ownProps.toggleLoading(false);
                    });
            } else {
                addStatusColumn(layerId)
                    .then(res => {
                        const updatedAttributesList = attributesList.slice();
                        updatedAttributesList.push(TRUE_STATUS_COLUMN_NAME);
                        dispatch(setAttributesList(updatedAttributesList));
                        updateObjects(layerId, objectsToUpdate)
                            .then(res => {
                                const updatedFeatures = selectedFeatures.map(feature => {
                                    feature.status = code;
                                    return feature;
                                });
                                dispatch(updateFeatures(updatedFeatures));
                                ownProps.toggleLoading(false);
                            });
                    });
            }
        }
    }
}

export default connect(mapStateToProps, null, mergeProps)(StatusChangeButton);
