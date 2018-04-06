import React from 'react';
import { CheckboxContainer } from './containers';

const SelectionPanel = (props) => {
    return (
        <div>
            <div>{`Выделено: ${props.totalCount}`}</div>
            <CheckboxContainer
                param="selectAllFeatures"
                checked={props.full}
                label={props.selectLabel}
            />
            <CheckboxContainer
                param="revertSelection"
                defaultChecked={false}
                label={props.revertLabel}
            />
        </div>
    );
}

export default SelectionPanel;
