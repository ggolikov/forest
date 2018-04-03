import React from 'react';
import { render } from 'react-dom';
import Preview from "../components/Preview";

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

const preview = (params, id, type) => {
    const state = window.store.getState();
    const { layerId, featuresIds } = state;
    const feature = featuresIds.find(f => f.id === id);
    const bounds = L.gmxUtil.getGeometryBounds(feature.geometry);
    const lBounds = bounds.toLatLngBounds();
    const center = bounds.getCenter();
    const zoom = nsGmx.leafletMap.getBoundsZoom(lBounds) - 1;
    const width = '550px';
    const height = '386px';

    if (window._mapHelper) {
        let permalinkPrams = {
            filters: {
                [layerId]: [{'filterById': id}]
            },
            controls: {
                'location': true
            },
            exportMode: true,
            isFullScreen: true,
            width: '550px',
            height: '386px',
            position: {
                x: center[0],
                y: center[1],
                z: 17 - zoom
            }
        };

        window._mapHelper.createExportPermalink(permalinkPrams, function (id) {
            const url = `http://${window.location.host}${window.location.pathname}?permalink=${id}&${layerId}`;
            const mapFrame = `<iframe src=${url} width=${width} height=${height}></iframe>`;
            console.log(url);
            openWindow(mapFrame);
        });
    } else {
        openWindow();
    }

    function openWindow(frame) {
        const url = type === 'plugin' ? './plugins/forestproject/preview.html' : './preview.html';
        const newWindow = window.open(url,'_blank');

        newWindow.onload = () => {
            const headerRoot = newWindow.document.querySelector('.preview-header');
            const paramsRoot = newWindow.document.querySelector('#preview-params-container');
            const mapRoot = newWindow.document.querySelector('#preview-map-container');

            headerRoot.innerText = `Отчет ${params.reportType}`;
            if (frame) {
                mapRoot.innerHTML = frame;
            } else {
                initMap(mapRoot);
            }

            render(
                <Preview params={params} />,
                paramsRoot
            );
        }
    }
}

export default preview;
