import '../translations.js';
import '../translationsHash.js';
import { combineReducers } from 'redux';
import reportTypeReducer from './reportTypeReducer';
import loaderReducer from './loaderReducer';
import layerIdReducer from './layerIdReducer';
import quadrantLayerIdReducer from './quadrantLayerIdReducer';
import idFieldReducer from './idFieldReducer';
import idFieldIndexReducer from './idFieldIndexReducer';
import featuresIdsReducer from './featuresIdsReducer';
import featuresCountReducer from './featuresCountReducer';
import attributesListReducer from './attributesListReducer';
import organizationNameReducer from './organizationNameReducer';
import innReducer from './innReducer';
import regionReducer from './regionReducer';
import forestryReducer from './forestryReducer';
import sectionForestryReducer from './sectionForestryReducer';
import quadrantReducer from './quadrantReducer';
import stratumReducer from './stratumReducer';
import satelliteLayerIdReducer from './satelliteLayerIdReducer';
import fellingFormReducer from './fellingFormReducer';
import fellingTypeReducer from './fellingTypeReducer';
import recoveryEventTypeReducer from './recoveryEventTypeReducer';

export default combineReducers({
    loader: loaderReducer,
    layerId: layerIdReducer,
    quadrantLayerId: quadrantLayerIdReducer,
    idField: idFieldReducer,
    idFieldIndex: idFieldIndexReducer,
    featuresIds: featuresIdsReducer,
    featuresCount: featuresCountReducer,
    attributesList: attributesListReducer,
    reportType: reportTypeReducer,
    organizationName: organizationNameReducer,
    inn: innReducer,
    region: regionReducer,
    forestry: forestryReducer,
    sectionForestry: sectionForestryReducer,
    quadrant: quadrantReducer,
    stratum: stratumReducer,
    satLayers: satelliteLayerIdReducer,
    fellingForm: fellingFormReducer,
    fellingType: fellingTypeReducer,
    recoveryEventType: recoveryEventTypeReducer
});
