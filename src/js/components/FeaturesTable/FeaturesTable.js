import React, { Component } from 'react';
import ReactTable from "react-table";
import { ReactTableDefaults } from 'react-table'
import { SelectCheckboxContainer } from '../containers';
import { zoomToFeature, getFeatureProps, getFeatureProps2, preview } from '../../helpers';
import { FEATURES_CHUNK_SIZE } from '../../constants';
import Icon from './Icon';
import "./react-table.sass";
import "./index.sass";

class FeaturesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            currentlyLoadedPage: 0
        };

        const TableParams = {
            showPagination: false,
            showPaginationTop: false,
            showPaginationBottom: false,
            showPageSizeOptions: false,
            // defaultPageSize: props.featuresCount
        }

        Object.assign(ReactTableDefaults, TableParams);
    }

    componentWillReceiveProps(nextPtops) {
        const { list } = nextPtops;

        this.setState({list});
    }

    drawCheckbox = (props) => {
        const { id, selected } = props.original;
        return (
            <SelectCheckboxContainer
                id={id}
                selected={selected}
            />
        );
    }

    drawZoomToFeatureIcon = (props) => {
        const { layerId, type } = this.props;
        const { id, geometry } = props.original;

        return (
            <Icon
                action="zoomtoFeature"
                type={type}
                layerId={layerId}
                id={id}
                geometry={geometry}
            />
        )
    }

    drawShowPreviewIcon = (props) => {
        const { layerId, type } = this.props;
        const { id, geometry } = props.original;

        return (
            <Icon
                action="showPreview"
                type={type}
                layerId={layerId}
                id={id}
                geometry={geometry}
            />
        )
    }

    render() {
        const { list } = this.state;
        const columns = [
            {
                Header: 'выделение',
                Cell: this.drawCheckbox,
                accessor: 'id'
            },
            {
                Header: 'Id',
                accessor: 'id' // String-based value accessors!
            }, {
                Header: 'приблизить',
                Cell: this.drawZoomToFeatureIcon,
                accessor: 'id'
            }, {
                Header: 'превью',
                Cell: this.drawShowPreviewIcon,
                accessor: 'id'
            }/*, {
              id: 'friendName', // Required because our accessor is not a string
              Header: 'Friend Name',
              accessor: d => d.friend.name // Custom value accessors!
            }, {
              Header: props => <span>Friend Age</span>, // Custom header components!
              accessor: 'friend.age'
          }*/]

        return (
                <ReactTable
                  data={list}
                  columns={columns}
                  // className="-striped -highlight"
                />
        )
    }
}

export default FeaturesTable;
