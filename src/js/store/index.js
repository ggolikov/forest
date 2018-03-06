import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
// import api from '../middlewares/api';
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk);

const store = createStore(reducer, {}, enhancer);

//dev only
window.store = store;

export default store;
