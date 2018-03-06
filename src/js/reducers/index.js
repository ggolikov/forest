import { combineReducers } from 'redux';
import stepReducer from './stepReducer';
import nameReducer from './nameReducer';
import beginDateReducer from './beginDateReducer';
import endDateReducer from './endDateReducer';
import windReducer from './windReducer';
import pointsReducer from './pointsReducer';
import reverseCalcReducer from './reverseCalcReducer';
import currentsReducer from './currentsReducer';
import permanentSourceReducer from './permanentSourceReducer';
import isOilReducer from './isOilReducer';
import buildImagesReducer from './buildImagesReducer';
import windDriftCoeffReducer from './windDriftCoeffReducer';
import windDriftAngleReducer from './windDriftAngleReducer';
import turbCoeffReducer from './turbCoeffReducer';
import oilReducer from './oil';

export default combineReducers({
    step: stepReducer,
    name: nameReducer,
    beginDate: beginDateReducer,
    endDate: endDateReducer,
    points: pointsReducer,
    countWind: windReducer,
    reverseCalc: reverseCalcReducer,
    countCurrents: currentsReducer,
    permanentSource: permanentSourceReducer,
    isOil: isOilReducer,
    buildImages: buildImagesReducer,
    windDriftCoeff: windDriftCoeffReducer,
    driftCurrentsRotationAngle: windDriftAngleReducer,
    turbulentExchangeCoeff: turbCoeffReducer,
    oil: oilReducer
});
