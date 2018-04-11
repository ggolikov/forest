import React, { Component } from 'react';
import ReactTable from "react-table";
import { ReactTableDefaults } from 'react-table'
import { SelectCheckboxContainer, CheckboxContainer } from '../containers';
import { zoomToFeature, getFeatureProps, getFeatureProps2, preview } from '../../helpers';
import { FEATURES_CHUNK_SIZE } from '../../constants';
import Icon from './Icon';
// import "./react-table.sass";
import "./index.sass";

class FeaturesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            currentlyLoadedPage: 0
        };

        const TableParams = {
            showPagination: true,
            showPaginationTop: false,
            showPaginationBottom: true,
            showPageSizeOptions: false,
            defaultPageSize: 15,
            filterable: false,
            previousText: 'назад',
            nextText: 'вперед',
            loading: false,
            loadingText: '',
            pageText: 'Стр.',
            ofText: 'из'
        };

        Object.assign(ReactTableDefaults, TableParams);
    }

    componentWillReceiveProps(nextPtops) {
        const { list } = nextPtops;

        this.setState({list});
    }

    drawCheckboxHeader = (props) => {
        const { full } = this.props;
        return (
            <CheckboxContainer
                param="selectAllFeatures"
                checked={props.full}
            />
        );
    }

    drawCountHeader = (props) => {
        const { selectedFeaturesCount } = this.props;
        return (
            <span>
                {`Выделено: ${selectedFeaturesCount}`}
            </span>
        );
    }

    drawInvertCheckbox = (props) => {
        const { full } = this.props;
        return (
            <CheckboxContainer
                param="revertSelection"
                defaultChecked={false}
                label={props.revertLabel}
            />
        );
    }

    drawCheckbox = (props) => {
        const { id, selected } = props.original;
        return (
            <SelectCheckboxContainer
                id={id}
                checked={selected}
            />
        );
    }

    drawStatusIndicator = (props) => {
        // const { layerId, type } = this.props;
        const { status } = props.original;
        let prefix;

        switch (status) {
            case 0:
                prefix = '-bad';
                break;
            case 1:
                prefix = '-mean';
                break;
            case 2:
                prefix = '-good';
                break;
            default:
                prefix = '-bad';
        }

        let indicatorClassName = `gmx-status-indicator${prefix}`

        return (
            <div className={indicatorClassName}></div>
        );
    }

    drawZoomToFeatureIcon = (props) => {
        const { layerId, type } = this.props;
        const { id, geometry } = props.original;

        return (
            <Icon
                action='zoomToFeature'
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
                action='showPreview'
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
                id: 'selected',
                Header: this.drawCheckboxHeader,
                Cell: this.drawCheckbox,
                accessor: d => (d.selected),
                filterable: false,
                minWidth: 30
            },
            {
                Header: this.drawCountHeader,
                accessor: 'id',
                minWidth: 200
            }, {
                id: 'status',
                Header: this.drawInvertCheckbox,
                Cell: this.drawStatusIndicator,
                accessor: d => (-d.status),
                filterable: false,
                minWidth: 30
            }, {
                Header: '',
                Cell: this.drawZoomToFeatureIcon,
                accessor: 'id',
                filterable: false,
                minWidth: 30
            }, {
                Header: '',
                Cell: this.drawShowPreviewIcon,
                accessor: 'id',
                filterable: false,
                minWidth: 30
            }];

        return (
                <ReactTable
                  data={list}
                  columns={columns}
                />
        )
    }
}

export default FeaturesTable;
