import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import Button from '../Button';
import { STATUS_COLUMN_NAME } from '../../constants';
import { updateObjects } from '../../helpers';
import { updateFeatures } from '../../AC';

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
            const { featuresIds } = state;
            const selectedFeatures = featuresIds.filter(item => item.selected);
            const objectsToUpdate = selectedFeatures
                .map(item => {
                    return {
                        action: "update",
                        id: item.id,
                        properties: {
                            [STATUS_COLUMN_NAME]: code
                        }
                    }
                });

            ownProps.toggleLoading(true);

            updateObjects(layerId, objectsToUpdate)
                .then(res => {
                    const updatedFeatures = selectedFeatures.map(feature => {
                        feature.status = code;
                        return feature;
                    })
                    dispatch(updateFeatures(updatedFeatures));
                    ownProps.toggleLoading(false);
                });

            setTimeout(() => {
            }, 2000)
        }
    }
}

export default connect(mapStateToProps, null, mergeProps)(StatusChangeButton);
