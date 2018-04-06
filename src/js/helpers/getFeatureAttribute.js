const getFeatureAttribute = (feature, attrName) => {
    attrName = attrName.toUpperCase();

    return  feature.attrs[attrName];
}

export default getFeatureAttribute;
