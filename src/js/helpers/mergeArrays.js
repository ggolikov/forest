const mergeArrays = (source, dest) => {
    let hash = source.reduce((obj, currentItem, index, arr) => {
        obj[currentItem.id] = currentItem;
            return obj;
    }, {});

    dest.forEach(feature => {
        if (feature.id in hash) {
            hash[feature.id] = feature;
        };
    });

    return Object.values(hash);
}

export default mergeArrays;
