import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { editPoint } from '../AC';

const PointsList = ({onChange, points}) => {
    const list = points.map(point => {
        const xValue = point.x || '';
        const yValue = point.y || '';

        return (
            <div key={point.id}>
                <Input placeholder="x:" value={xValue} onChange={(e) => {onChange(e, point.id, 'x')}} />
                <Input placeholder="y:" value={yValue} onChange={(e) => {onChange(e, point.id, 'y')}} />
            </div>
        )
    })

    return (
        <div>
            {list}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        points: state.points
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (e, id, coordType) => {
            dispatch(editPoint(id, coordType, Number(e.target.value)));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointsList);
