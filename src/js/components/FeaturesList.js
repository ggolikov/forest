import React, { Component } from 'react';
import Input from './Input';
import ListItem from './ListItem';

const FeaturesList = ({features, idFieid}) => {
    console.log(features);
    console.log(idFieid);

    const list = features.values.map(feature => {
        console.log(feature);
        return (
            <div key={features} />
        )

        return (
            <ListItem key={point.id} />
        )
    })

    return (
        <div>
            lalala
        </div>
    )
}

export default FeaturesList;
