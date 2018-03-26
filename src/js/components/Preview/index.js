import React from 'react';
import Block from './Block';
import RowHeader from './RowHeader';
import { userLabels, satelliteLabels } from './labels';
import { mapStateToRows } from '../../helpers';

const Preview = ({ state }) => {
    const userRows = mapStateToRows(userLabels, state);

    const txt = JSON.stringify(state);
    const userHeaderLabel = window._gtxt("Лесной участок");
    const satelliteHeaderLabel = window._gtxt("Космический снимок");
    console.log(state);
    // {txt}
    return (
        <div>
            <RowHeader label={userHeaderLabel} />
            <Block rows={userRows}/>
        </div>
    )
}

export default Preview;
