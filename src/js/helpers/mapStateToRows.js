const mapStateToRows = (labels, state) => {
    let res  = [];
    for (let key in labels) {
        res.push({
            label: key,
            value: state[labels[key]] || ""
        });
    }

    return res;
};

export default mapStateToRows;
