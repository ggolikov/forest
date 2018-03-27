import React from 'react';
import Row from './Row';

const Block = ({ rows }) => {
    const rowElems = rows.map(row => {
        const { label, value } = row;
        return <Row key={label} label={label} value={value} />
    });

    return (
        <div>
            {rowElems}
        </div>
    )
}

export default Block;
