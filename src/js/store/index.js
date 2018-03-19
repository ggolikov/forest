import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import initFeautes from '../middlewares/initFeatures';
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk, initFeautes);

const store = createStore(reducer, {}, enhancer);

//dev only
window.store = store;

export default store;
