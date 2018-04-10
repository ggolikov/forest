import { SENTINEL_LAYER_ID, BLANK_SELECT_OPTION } from '../constants';
import getFeatureProps from './getFeatureProps';
import getFeatureProps2 from './getFeatureProps2';
import mapStateToRows from './mapStateToRows';
import selectFeaturesWithDrawing from './selectFeaturesWithDrawing';
import preview from './preview';
import getAttribute from './getAttribute';
import sortFeatures from './sortFeatures';
import getFeatureAttribute from './getFeatureAttribute';
import updateObjects from './updateObjects';
import encodeParams from './encodeParams';
import mergeArrays from './mergeArrays';
import mapFeaturesToStore from './mapFeaturesToStore';
import makeReport from './makeReport';
import collectParams from './collectParams';
import downloadFile from './downloadFile';

/**
 * Запрос за объектами слоя
 * VectorLayer/Search.ashx
 * https://docs.google.com/document/d/1Dky3Lg8WIiHREYln0zVgUqfpHFptlolCZ_i8aB0Iljw/edit#heading=h.t355wryw7p1x
 */
export const loadFeatures = (layerId, page, pagesize, count) => {
    const params = {
        layer: layerId,
        page: page,
        pagesize: pagesize,
        count: count,
        geometry: true
    },
    url = `${window.serverBase}VectorLayer/Search.ashx?${encodeParams(params)}`,
    options = {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    };

    return fetch(url, options)
        .then(res => res.text())
        .then(str => {
            let res = JSON.parse(str.substring(1, str.length-1));
            return Promise.resolve(res);
        })
        .catch(err => console.log(err));
}

export const zoomToFeature = (layerId, id, geometry) => {
    let layer = nsGmx.gmxMap.layersByID[layerId],
        fitBoundsOptions = layer ? {maxZoom: layer.options.maxZoom} : {},
        geom = L.gmxUtil.geometryToGeoJSON(geometry, true),
        bounds = L.gmxUtil.getGeometryBounds(geom);

    // layer.setStyleHook((it) => {
    //     if (it.id === id) {
    //         return {
    //             strokeStyle: 'rgba(0, 255, 255)',
    //             lineWidth: 2
    //         };
    //     } else {
    //         return {
    //             strokeStyle: 'rgba(255, 255, 0)'
    //         };
    //     }
    // });
    //
    // setTimeout(() => {
    //     layer.removeStyleHook();
    // }, 2000);

    nsGmx.leafletMap.fitBounds([
        [bounds.min.y, bounds.min.x],
        [bounds.max.y, bounds.max.x]
    ], fitBoundsOptions);
}

export const getLayersList = (gmxMap) => {
    let arr = gmxMap.layers.map(layer => {
                if (layer.getGmxProperties) {
                    let props = layer.getGmxProperties();
                        if (props.type === 'Vector' && !props.IsRasterCatalog) {
                            return ({
                                title: props.title,
                                layerId: props.name,
                            });
                        }
                }
            }).filter(item => {
                return item;
            });

    return [BLANK_SELECT_OPTION].concat(arr);
}

export const addScreenObserver = (leafletMap, gmxMap) => {
    // TODO: implement logic of searching for layers
    // currently using default sentinel layer

    const layer = gmxMap.layersByID[SENTINEL_LAYER_ID];

    // window.layer = layer;
    const gmx = layer._gmx;
    const observerCallback = (data) => {};


    const filters = gmx.dataManager.getViewFilters('screen', gmx.layerID);
    const observerOptions = {
        type: 'resend',
        layerID: gmx.layerID,
        needBbox: gmx.needBbox,
        bounds: leafletMap.getBounds(),
        dateInterval: gmx.layerType === 'VectorTemporal' ? [gmx.beginDate, gmx.endDate] : null,
        filters: ['clipFilter', 'userFilter_' + gmx.layerID, 'styleFilter', 'userFilter'].concat(filters),
        active: true,
        callback: observerCallback
    };

    const currentSatObserver = gmx.dataManager.addObserver(observerOptions, 'currentSat');
    window.currentSatObserver = currentSatObserver;
}

export const setStyle = (layer, features)  => {
    const idsHash = features.reduce((obj, currentItem, index, arr) => {
        obj[currentItem.id] = true;
            return obj;
    }, {});

    layer.setStyleHook((it) => {
        if (it.id in idsHash) {
            return {
                strokeStyle: 'rgba(0, 255, 255, 0.9)',
                lineWidth: 4
            };
        } else {
            return {};
        }
    });

    layer.repaint();
}

export const clearStyle = (layer, features)  => {
    layer.setStyleHook((it) => {
        return {
            strokeStyle: 'rgba(255, 255, 0)'
        };
    });
}

export {
        getFeatureProps,
        getFeatureProps2,
        mapStateToRows,
        preview,
        getAttribute,
        selectFeaturesWithDrawing,
        mergeArrays,
        mapFeaturesToStore,
        updateObjects,
        getFeatureAttribute,
        sortFeatures,
        makeReport,
        collectParams,
        downloadFile
    };
