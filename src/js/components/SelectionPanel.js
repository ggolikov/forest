import React from 'react';
import { ButtonContainer, CheckboxContainer } from './containers';

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
            <ButtonContainer
                className="gmx-sidebar-button"
                param="clearSelection"
            >
                {props.clearLabel}
            </ButtonContainer>
        </div>
    );
}

export default SelectionPanel;
