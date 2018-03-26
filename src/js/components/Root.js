import React from 'react';
import AppContainer from './AppContainer'
import store from '../store'
import { Provider } from 'react-redux';

function Root(props) {
    return (
        <Provider store={store}>
            <AppContainer lmap={props.lmap} gmxMap={props.gmxMap} />
        </Provider>
    )
}

export default Root;
