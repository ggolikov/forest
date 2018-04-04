import React from 'react';
import { render } from 'react-dom';
import Root from './js/components/Root';
import { initTimeline } from './js/mapHooks';
import { addScreenObserver } from './js/helpers';
import './css/main.sass';
import './js/translations.js';
import './js/translationsHash.js';

window.nsGmx = window.nsGmx || {};
window.serverBase = window.serverBase || '//maps.kosmosnimki.ru/';

let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.828673, 40.070571]),
    leafletMap = new L.Map('map', {layers: [osm], center: point, zoom: 11, maxZoom: 22}),
    root = document.getElementById('content');

window.lmap = leafletMap;

L.gmx.loadMap('C7764CA37ACF4137A9371717013A3353', {leafletMap})
    .then(gmxMap => {
        window.nsGmx.gmxMap = gmxMap;
        window.nsGmx.leafletMap = leafletMap;

        // temporary here
        // addScreenObserver(leafletMap, gmxMap);

        // initTimeline(gmxMap, leafletMap);

        render(
            <Root lmap={leafletMap} gmxMap={gmxMap} />,
            document.querySelector('.content')
        );
    });
