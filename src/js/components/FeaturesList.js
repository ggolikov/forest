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
        this.state = {
            list: props.list,
            currentlyLoadedPage: 0
        };
    }

    componentWillReceiveProps(nextPtops) {
        const { list } = nextPtops;

        this.setState({list});
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        const { idFieldIndex, layerId, featuresCount } = this.props;
        const { currentlyLoadedPage } = this.state;

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
                    loadFeatures(layerId, currentlyLoadedPage + i, FEATURES_CHUNK_SIZE)
                        .then(json => {
                            console.log(idFieldIndex);
                            const fetchedList = json.Result.values.map(value => value[idFieldIndex]);
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
        const { layerId, idField, idFieldIndex, featuresCount, loading } = this.props;
        const { list } = this.state;
        const isRowLoaded = ({ index }) => {
            return !!this.state.list[index];
        }
        const label = window._gtxt('Список участков');
        const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
            const scrollHolder = '...';
            const elem = (
                    <ListGroupItem bsClass="gmx-list-item">
                        <ListItem
                            {...this.props}
                            txt={this.state.list[index]}
                            layerId={layerId}
                            id={this.state.list[index]}
                            idField={idField}
                         />
                    </ListGroupItem>
            );
            const content = isScrolling ? scrollHolder : elem;

            return (
                <div key={key} style={style}>
                    {content}
                </div>
            )
        }

        const loadMessage = window._gtxt("Загрузка...");

        const loadedList = loading ?
            <div className="gmx-features-list">
                {loadMessage}
            </div> : (
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
            )


        return (
            <div>
                <ControlLabel>
                    {label}
                </ControlLabel>
                {loadedList}
            </div>
        )
    }
}

export default FeaturesList;
