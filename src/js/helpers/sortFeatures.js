const sortFeatures = (features) => {
    return features.sort((a, b) => {
        return b.id > a.id;
    })
}

export default sortFeatures;
