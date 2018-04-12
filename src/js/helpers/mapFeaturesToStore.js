import { DEMO_GEOMETRY_FIELD, STATUS_COLUMN_NAME, TRUE_STATUS_COLUMN_NAME } from '../constants';
const mapFeaturesToStore = (result, index, selectFlag) => {
    const geometryIndex = result.fields.indexOf(DEMO_GEOMETRY_FIELD);
    const statusIndex = result.fields.indexOf(TRUE_STATUS_COLUMN_NAME);
    return result.values.map(value => {
        let attrs = value.reduce((obj, currentItem, index, arr) => {
            obj[result.fields[index]] = currentItem;
            return obj;
        }, {});

        return {
            id: value[index],
            selected: selectFlag,
            status: value[statusIndex],
            attrs: attrs,
            geometry: value[geometryIndex]
        };
    });
}

export default mapFeaturesToStore;
