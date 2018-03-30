const mergeArrays = (source, dest) => {
    let sourceIds = source.map(feature => feature.id);
    let copySource = source.map(feature => feature);

    dest.forEach(feature => {
        const indexInSource = sourceIds.indexOf(feature.id);
        copySource.splice(indexInSource, 1, feature)
    });

    return copySource;
}

export default mergeArrays;
