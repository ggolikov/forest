import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from './AppContainer'
import store from '../store'
import { Provider } from 'react-redux';

function Root(props) {
    return (
        <Router>
            <Provider store={store}>
                <AppContainer lmap={props.lmap} gmxMap={props.gmxMap} />
            </Provider>
        </Router>
    )
}

export default Root;
