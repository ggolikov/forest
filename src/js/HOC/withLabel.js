import React from 'react';
import { ControlLabel } from 'react-bootstrap';

export const withLabel = InnerComponent => {
    return (props) => {
        const { label } = props;

        const elem = label ? (
            <div>
                <ControlLabel>
                    {label}
                </ControlLabel>
                <InnerComponent {...props}/>
            </div>
        ) : <InnerComponent {...props}/>;

        return elem;
    }
}
