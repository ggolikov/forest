import React from 'react';
import Block from './Block';
import { userLabels, sateliteLabels } from './labels';
import { mapStateToRows } from '../../helpers';

const Preview = ({ state }) => {
    const userRows = mapStateToRows(userLabels, state);

    const txt = JSON.stringify(state);
    console.log(state);
    // {txt}
    return (
        <div>
            <Block rows={userRows}/>
        </div>
    )
}

export default Preview;
