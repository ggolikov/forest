import React, { Component } from 'react';
import PQueue from 'p-queue';
import { ListGroup, ListGroupItem, ControlLabel } from 'react-bootstrap';
import { InfiniteLoader, List } from 'react-virtualized';
import ListItem from './ListItem';
import { loadFeatures } from '../helpers';
import { FEATURES_CHUNK_SIZE } from '../constants';

class FeaturesList extends Component {
    constructor(props) {
        super(props);
        const index = props.features.fields.indexOf(props.idField);
        this.state = {
            index: index,
            list: props.features.values.map(value => value[index]),
            currentlyLoadedPage: 0,
            // special for ID's
            id: index,
            ids: props.features.values.map(value => value[index])
        };
    }

    componentWillReceiveProps(nextPtops) {
        const { idField, features } = nextPtops;
        const index = features.fields.indexOf(idField);

        const list = features.values.map(value => value[index]);

        this.setState({
            index: index,
            list: list,
            // special for ID's
            idIndex: index,
            ids: features.values.map(value => value[index])
        });
        window.sarr = this.state.List;
    }

    componentDidUpdate(prevProps, prevState) {
        // // If props/state signals that the underlying collection has changed,
        // // Reload the most recently requested batch of rows:
        // console.log(prevProps, prevState);
        // if (false) {
        //     // console.log(this._loadMoreRowsStartIndex, this._loadMoreRowsStopIndex);
        //     this.loadMoreRows({
        //         startIndex: this._loadMoreRowsStartIndex,
        //         stopIndex: this._loadMoreRowsStopIndex
        //     })
        // }
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        const { layerID, featuresCount } = this.props;
        const { index, currentlyLoadedPage } = this.state;

        const maxLoadingPage = Math.round(stopIndex / FEATURES_CHUNK_SIZE);
        const pagesToLoad = maxLoadingPage - currentlyLoadedPage;

        const promiseArrResolver = function (arr) {
            let { list } = this.state;
            let updatedList = list.concat(...arr);
            console.log(updatedList.length);

            this.setState({list: updatedList});
        }.bind(this);

        console.log(`currentlyLoadedPage: ${currentlyLoadedPage}`);
        console.log(`pagesToLoad: ${pagesToLoad}`);
        console.log(`maxLoadingPage: ${maxLoadingPage}`);

        if (pagesToLoad) {
            let promiseArr = [];

            for (let i = 1; i < pagesToLoad + 1; i++) {
                promiseArr.push(
                    loadFeatures(layerID, currentlyLoadedPage + i, FEATURES_CHUNK_SIZE)
                        .then(json => {
                            const fetchedList = json.Result.values.map(value => value[index]);
                            return Promise.resolve(fetchedList);
                        })
                );
            }

            Promise.all(promiseArr)
                .then(promiseArrResolver);

            this.setState({
                currentlyLoadedPage: maxLoadingPage
            });
        }
    }

    render() {
        const { layerId, idField, features, featuresCount } = this.props;
        const { idIndex, ids } = this.state;

        const IdIndex = features.fields.indexOf(idField);

        const isRowLoaded = ({ index }) => {
            return !!this.state.list[index];
        }

        const label = window._gtxt('Список участков')

        const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
            return (
                <div key={key} style={style}>
                    <ListGroupItem bsClass="gmx-list-item">
                        <ListItem
                            {...this.props}
                            txt={this.state.list[index]}
                            layerId={layerId}
                            id={this.state.list[index]}
                         />
                    </ListGroupItem>
                </div>
            )
        }

        return (
            <div>
                <ControlLabel>
                    {label}
                </ControlLabel>
                <div className="gmx-features-list">
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={this.loadMoreRows}
                        rowCount={featuresCount}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <List
                                width={360}
                                height={350}
                                rowHeight={30}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={featuresCount}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </InfiniteLoader>
                </div>
            </div>
        )
    }
}

export default FeaturesList;
