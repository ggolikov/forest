import React from 'react';
import { render } from 'react-dom';
import Preview from "../components/Preview";
import { BLANK_SELECT_OPTION } from '../constants';

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
        }

    return fetch(url, options)
        .then(res => res.text())
        .then(str => {
            let features = JSON.parse(str.substring(1, str.length-1));
            return Promise.resolve(features);
        })
        .catch(err => console.log(err));
}

export const encodeParams = (obj) => {
    return Object.keys(obj).map(function(key) {
        return key + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

export const zoomToFeature = (layerId, id, idField) => {
    const params = {
            layer: layerId,
            page: 0,
            geometry: true,
            query: `[${idField}]=${id}`
        },
        url = `${window.serverBase}VectorLayer/Search.ashx?${encodeParams(params)}`,
        options = {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        };

    const promise = fetch(url, options)
        .then(res => res.text())
        .then(str => {
            let response = JSON.parse(str.substring(1, str.length-1)),
                layer = nsGmx.gmxMap.layersByID[layerId],
                props = layer.getGmxProperties(),
                isTemporalLayer = (layer instanceof L.gmx.VectorLayer && props.Temporal) || (props.type === 'Virtual' && layer.getDateInterval),
                columnNames = response.Result.fields,
                row = response.Result.values[0];

            for (var i = 0; i < row.length; ++i) {
                if (columnNames[i] === 'geomixergeojson' && row[i]) {

                    let fitBoundsOptions = layer ? {maxZoom: layer.options.maxZoom} : {},
                        geom = L.gmxUtil.geometryToGeoJSON(row[i], true),
                        bounds = L.gmxUtil.getGeometryBounds(geom);

                    nsGmx.leafletMap.fitBounds([
                        [bounds.min.y, bounds.min.x],
                        [bounds.max.y, bounds.max.x]
                    ], fitBoundsOptions);

                    if (isTemporalLayer) {
                        let tempColumn = props.TemporalColumnName,
                            index = columnNames.indexOf(tempColumn),
                            dayms = nsGmx.DateInterval.MS_IN_DAY,
                            dateBegin, dateEnd,
                            datems;

                        if (index !== -1) {
                            datems = row[index] * 1000;
                            dateBegin = nsGmx.DateInterval.toMidnight(new Date(datems));
                            dateEnd = nsGmx.DateInterval.toMidnight(new Date(datems + dayms));
                            nsGmx.widgets.commonCalendar.setDateInterval(dateBegin, dateEnd, layer);
                        }
                    }
                }
            }
        })
        .catch(err => console.log(err));
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

export const addScreenObserver = (gmxMap, leafletMap) => {
    // TODO: implement logic of searching for layers
    // currently using default sentinel layer
    const filters = gmx.dataManager.getViewFilters('screen', gmx.layerID);
    const observerOptions = {
        type: 'resend',
        layerID: gmx.layerID,
        needBbox: gmx.needBbox,
        bbox: leafletMap.getBounds(),
        dateInterval: gmx.layerType === 'VectorTemporal' ? [gmx.beginDate, gmx.endDate] : null,
    filters: ['clipFilter', 'userFilter_' + gmx.layerID, 'styleFilter', 'userFilter'].concat(filters),
    active: false //делаем его неактивным, так как потом будем явно выбирать данные
};
if (this.options.isGeneralized) {
    observerOptions.targetZoom = zoom;
};
gmx.dataManager.addObserver(observerOptions, 'hover');

}

const initMap = (mapRoot) => {
    let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18
    }),
    point = L.latLng([52.828673, 13.070571]),
    leafletMap = new L.Map(mapRoot, {layers: [osm], center: point, zoom: 7, maxZoom: 22});

    console.log(leafletMap.getBounds());




}

export const preview = (state, map) => {
    const url = '/preview.html';
    const newWindow = window.open(url,'_blank');

    newWindow.onload = () => {
        const headerRoot = newWindow.document.querySelector('.preview-header');
        const paramsRoot = newWindow.document.querySelector('#preview-params-container');
        const mapRoot = newWindow.document.querySelector('#preview-map-container');

        headerRoot.innerText = `Отчет ${state.reportType}`;

        initMap(mapRoot);

        render(
            <Preview state={state} />,
            paramsRoot
        );
    }
}


export const mapStateToRows = (labels, state) => {
    let res  = [];
    for (let key in labels) {
        res.push({
            label: key,
            value: state[labels[key]]
        });
    }

    return res;
};
