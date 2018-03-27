import React from 'react';

const Row = ({ label, value }) => {
    return (
        <div className={"preview-row"}>
            <div className={"preview-row-part preview-row-label"}>
                {label}
            </div>
            <div className={"preview-row-part preview-row-value"}>
                {value}
            </div>
        </div>
    )
}

export default Row;
