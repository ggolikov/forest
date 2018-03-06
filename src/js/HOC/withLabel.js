import React from 'react';
import { ControlLabel } from 'react-bootstrap';

export const withLabel = InnerComponent => {
    return (props) => {
        const { label, value, onChange } = props;

        return (
            <div>
                <ControlLabel>
                    {label}
                </ControlLabel>
                <InnerComponent onChange={onChange} value={value}/>
            </div>
        );
    }
}
