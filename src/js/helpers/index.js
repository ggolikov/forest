import React from 'react';
import { render } from 'react-dom';
import Preview from "../components/Preview";
import { SENTINEL_LAYER_ID, BLANK_SELECT_OPTION } from '../constants';

window.serverBase = '//maps.kosmosnimki.ru/';

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

export const encodeParams = (obj) => {
    return Object.keys(obj).map(function(key) {
        return key + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

export const zoomToFeature = (layerId, geometry) => {
    let layer = nsGmx.gmxMap.layersByID[layerId],
        fitBoundsOptions = layer ? {maxZoom: layer.options.maxZoom} : {},
        geom = L.gmxUtil.geometryToGeoJSON(geometry, true),
        bounds = L.gmxUtil.getGeometryBounds(geom);

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

    window.layer = layer;
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

export const selectRasters = (gmxMap, geometry) => {
    // TODO: implement logic of searching for layers
    // currently using default sentinel layer

    const layerIds = [SENTINEL_LAYER_ID];
    let promiseArr = [];

    layerIds.forEach((layerId) => {
        const l = gmxMap.layersByID[layerId];
        const { beginDate, endDate } = l.getDateInterval && l.getDateInterval();

        const params = {
            layer: layerId,
            page: 0,
            pagesize: 500,
            query: `STIntersects([gmx_geometry], GeometryFromGeoJson('${JSON.stringify(geometry)}', 3857)) AND ([acqdate] > '${beginDate.toLocaleDateString()}' OR [acqdate] < '${beginDate.toLocaleDateString()}')`
        },
        url = `${window.serverBase}VectorLayer/Search.ashx?${encodeParams(params)}`,
        options = {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        };

        promiseArr.push(
            fetch(url, options)
            .then(res => {
                return res.text();
            })
            .then(str => {
                let features = JSON.parse(str.substring(1, str.length-1));
                return Promise.resolve(features);
            })
            .catch(err => console.log(err))
        );
    });

    return Promise.all(promiseArr);
}

const initMap = (mapRoot) => {
    let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18
    }),
    point = L.latLng([52.828673, 13.070571]),
    leafletMap = new L.Map(mapRoot, {
        layers: [osm],
        center: point,
        attributionControl: false,
        zoomControl: false,
        zoom: 7,
        maxZoom: 22
    });
}

export const preview = (state, satelliteParams) => {
    const url = '/preview.html';
    const newWindow = window.open(url,'_blank');

    newWindow.onload = () => {
        const headerRoot = newWindow.document.querySelector('.preview-header');
        const paramsRoot = newWindow.document.querySelector('#preview-params-container');
        const mapRoot = newWindow.document.querySelector('#preview-map-container');

        headerRoot.innerText = `Отчет ${state.reportType}`;

        initMap(mapRoot);

        render(
            <Preview state={state} satelliteParams={satelliteParams} />,
            paramsRoot
        );
    }
}

export const mapStateToRows = (labels, state) => {
    let res  = [];
    for (let key in labels) {
        res.push({
            label: key,
            value: state[labels[key]] || ""
        });
    }

    return res;
};
