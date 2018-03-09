import { SENTINEL_LAYER_ID } from '../constants';
import '../lib/GMXPluginTimeLine/L.Control.gmxTimeLine.js';

export const initTimeline = (gmxMap, leafletMap) => {
    const sentinelLayer = gmxMap.layersByID[SENTINEL_LAYER_ID];

    window.nsGmx.gmxTimeLine.afterViewer({}, leafletMap);

    nsGmx.timeLineControl.addLayer(sentinelLayer);

    leafletMap.addControl(nsGmx.timeLineControl);
}
