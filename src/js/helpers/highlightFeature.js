const highlightFeature = (layerId, id) => {
    const layer = nsGmx.gmxMap.layersByID[layerId];
    const { featuresIds } = window.store.getState();
    const selectedFeatures = featuresIds.filter(f => {
            return f.selected;
    });
    const index = selectedFeatures.findIndex(item => item.id === id);
    const isSelected = index !== -1;
    console.log(isSelected);
    let currentStyle = {
        strokeStyle: isSelected ? 'rgba(0, 255, 255, 1)' : 'rgba(255, 255, 0, 1)',
        lineWidth: 2
    }


    layer.setStyleHook((it) => {
        if (it.id === id) {
            return {
                strokeStyle: 'rgba(255, 0, 0, 1)',
                lineWidth: 4
            };
        } else {
            return {};
        }
    });

    let timeout = window.setTimeout(() => {
        layer.setStyleHook((it) => {
            if (it.id === id) {
                console.log(currentStyle);
                return currentStyle;
            } else {
                return {};
            }
        });
    }, 2000);

    window.setTimeout(() => {
        window.clearTimeout(timeout);
    }, 2100);

}

export default highlightFeature;
