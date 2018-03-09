import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { InfiniteLoader, List } from 'react-virtualized';
import ListItem from './ListItem';
import { loadFeatures } from '../helpers';

class FeaturesList extends Component  {
    constructor(props) {
        super(props);
        const index = props.features.fields.indexOf(props.idFieid);
        this.state = {
            index: index,
            list: props.features.values.map(value => value[index])
        };

        this.maxLoadingPage = 0;
    }

    componentWillReceiveProps(nextPtops) {
        const { idFieid, features } = nextPtops;
        const index = features.fields.indexOf(idFieid);

        this.setState({
            index: index,
            list: features.values.map(value => value[index])
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // If props/state signals that the underlying collection has changed,
        // Reload the most recently requested batch of rows:
        console.log(prevProps, prevState);
        if (false) {
            // console.log(this._loadMoreRowsStartIndex, this._loadMoreRowsStopIndex);
            this.loadMoreRows({
                startIndex: this._loadMoreRowsStartIndex,
                stopIndex: this._loadMoreRowsStopIndex
            })
        }
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        const { layerID, featuresCount } = this.props;
        const { index, list } = this.state;

        const currentlyLoadedPage = Math.round(list.length / 500);
        const pagesToLoad = Math.round(stopIndex / list.length);
        const maxLoadingPage = currentlyLoadedPage + pagesToLoad;

        console.log(`currentlyLoadedPage: ${currentlyLoadedPage}`);
        console.log(`pagesToLoad: ${pagesToLoad}`);
        console.log(`maxLoadingPage: ${maxLoadingPage}`);

        if (maxLoadingPage > this.maxLoadingPage) {
        // if (stopIndex >= list.length) {
            let promisArr = [];

            for (let i = 0; i < pagesToLoad; i++) {
                promisArr.push(
                    loadFeatures(layerID, currentlyLoadedPage + i, 500)
                        .then(json => {
                            const updatedList = this.state.list.concat(json.Result.values.map(value => value[index]));

                            this.setState({list: updatedList})
                            console.log(`values.length: ${json.Result.values.length}`);
                        })
                );
            }

            Promise.all(promisArr);
            this.maxLoadingPage = maxLoadingPage;
        }
    }

    getPageNumber(featuresCount, startIndex, pagesize) {
        return (startIndex / pagesize) + 1;
    }

    render() {
        const { layerID, idFieid, features, featuresCount } = this.props;

        const isRowLoaded = ({ index }) => {
            return !!this.state.list[index];
        }

        const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
            return (
                <div key={key} style={style}>
                    <ListGroupItem bsClass="gmx-list-item">
                        <ListItem
                        txt={this.state.list[index]} />
                    </ListGroupItem>
                </div>
            )
        }

        return (
            <div className="gmx-features-list">
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={featuresCount}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <List
                            width={350}
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
    }
}


export default FeaturesList;
