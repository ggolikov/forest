const mapFeaturesToStore = (result, index, geometryIndex, selectFlag) => {
    return result.values.map(value => {
        let attrs = value.reduce((obj, currentItem, index, arr) => {
            obj[result.fields[index]] = currentItem;
            return obj;
        }, {});
        return {
            id: value[index],
            selected: selectFlag,
            attrs: attrs,
            geometry: value[geometryIndex]
        };
    });
}

export default mapFeaturesToStore;
