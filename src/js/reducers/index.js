import '../translations.js';
import '../translationsHash.js';
import { combineReducers } from 'redux';
import reportTypeReducer from './reportTypeReducer';
import organizationNameReducer from './organizationNameReducer';
import innReducer from './innReducer';

export default combineReducers({
    reportType: reportTypeReducer,
    organizationName: organizationNameReducer,
    inn: innReducer
});
