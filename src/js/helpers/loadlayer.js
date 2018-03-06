import React from 'react';
import { render } from 'react-dom';
import Root from '../components/Root';

const nsGmx = window.nsGmx || {};

/**
 * res {Object} instanceof gmxMap
 */
const loadLayer = function (gmxMap, lmap) {
    let obj = gmxMap.toString();

    render(
        <Root lmap={lmap} />,
        document.querySelector('.content')
    );
}

export default loadLayer;
