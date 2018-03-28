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

const preview = (params) => {
    const url = './preview.html';
    const newWindow = window.open(url,'_blank');

    newWindow.onload = () => {
        const headerRoot = newWindow.document.querySelector('.preview-header');
        const paramsRoot = newWindow.document.querySelector('#preview-params-container');
        const mapRoot = newWindow.document.querySelector('#preview-map-container');

        headerRoot.innerText = `Отчет ${params.reportType}`;

        initMap(mapRoot);

        render(
            <Preview params={params} />,
            paramsRoot
        );
    }
}

export default preview;
