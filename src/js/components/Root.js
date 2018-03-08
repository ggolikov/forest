import React from 'react';
import PropTypes from 'prop-types';
import App from './App'
import store from '../store'
import { Provider } from 'react-redux';

function Root(props) {
    return (
        <Provider store={store}>
            <App lmap={props.lmap} gmxMap={props.gmxMap} />
        </Provider>
    )
}

export default Root;
