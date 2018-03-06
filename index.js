import React from 'react';
import { render } from 'react-dom';
import Root from './src/js/components/Root';
//import './src/js/translations.js';
//import './src/js/translationsHash.js';

const nsGmx = window.nsGmx || {};

window.serverBase = 'http://maps.kosmosnimki.ru/';
// var m = document.querySelector('#map');
// m.style.height = document.documentElement.clientHeight + 'px';
// var lp = document.querySelector('.left-panel');
// lp.style.height = document.documentElement.clientHeight + 'px';

let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.819723, 37.611661]),
    leafletMap = new L.Map('map', {layers: [osm], center: point, zoom: 17, maxZoom: 22}),
    root = document.getElementById('content');

window.lmap = leafletMap;

L.gmx.loadMap('4ZICS', {leafletMap})
    .then(gmxMap => {
        render(
            <Root lmap={leafletMap} gmxMap={gmxMap} />,
            document.querySelector('.content')
        );
    });
