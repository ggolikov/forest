import { SENTINEL_LAYER_ID, DEMO_LAYER_ID } from '../constants';
import '../lib/GMXPluginTimeLine/L.Control.gmxTimeLine.js';

export const initTimeline = (gmxMap, leafletMap) => {
    const sentinelLayer = gmxMap.layersByID[SENTINEL_LAYER_ID];
    const l = gmxMap.layersByID[DEMO_LAYER_ID];


    window.nsGmx.gmxTimeLine.afterViewer({}, leafletMap);

    nsGmx.timeLineControl.addLayer(sentinelLayer);

    leafletMap.addControl(nsGmx.timeLineControl);
    //
    // layer.on('dateIntervalChanged', function(e){
    //     const { beginDate, endDate } = e.target.getDateInterval();
    //
    //     window.currentSatObserver.setDateInterval(beginDate, endDate);
    // });
}
