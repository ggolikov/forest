import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ListItem from './ListItem';

const FeaturesList = ({features, idFieid}) => {
    console.log(features);
    console.log(idFieid);

    const index = features.fields.indexOf(idFieid);

    const list = features.values.map(value => {
        return (
            <ListGroupItem>
                <ListItem key={value[index]} txt={value[index]} />
            </ListGroupItem>
        )
    })

    return (
        <div className="gmx-features-list">
            <ListGroup>
                {list}
            </ListGroup>
        </div>
    )
}

export default FeaturesList;
