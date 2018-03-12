import '../translations.js';
import '../translationsHash.js';
import { combineReducers } from 'redux';
import reportTypeReducer from './reportTypeReducer';
import layerIdReducer from './layerIdReducer';
import idFieldReducer from './idFieldReducer';
import idFieldIndexReducer from './idFieldIndexReducer';
import featuresIdsReducer from './featuresIdsReducer';
import featuresCountReducer from './featuresCountReducer';
import attributesListReducer from './attributesListReducer';
import organizationNameReducer from './organizationNameReducer';
import innReducer from './innReducer';

export default combineReducers({
    layerId: layerIdReducer,
    idField: idFieldReducer,
    idFieldIndex: idFieldIndexReducer,
    featuresIds: featuresIdsReducer,
    featuresCount: featuresCountReducer,
    attributesList: attributesListReducer,
    reportType: reportTypeReducer,
    organizationName: organizationNameReducer,
    inn: innReducer
});
