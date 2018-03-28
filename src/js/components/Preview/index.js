import React from 'react';
import Block from './Block';
import RowHeader from './RowHeader';
import { organisationLabels, areaLabels, satelliteLabels } from './labels';
import { mapStateToRows } from '../../helpers';

const Preview = ({ params }) => {
    const oganisationHeaderLabel = window._gtxt("Организация");
    const oganisationRows = mapStateToRows(organisationLabels, params);

    const areaHeaderLabel = window._gtxt("Лесной участок");
    const areaRows = mapStateToRows(areaLabels, params);

    const satelliteHeaderLabel = window._gtxt("Космический снимок");
    const satelliteRows = mapStateToRows(satelliteLabels, params);

    return (
        <div>
            <RowHeader label={oganisationHeaderLabel} />
            <Block rows={oganisationRows} />
            <RowHeader label={areaHeaderLabel} />
            <Block rows={areaRows} />
            <RowHeader label={satelliteHeaderLabel} />
            <Block rows={satelliteRows} />
        </div>
    )
}

export default Preview;
