import React from 'react';
import Button from '../components/Button';

export const withButton = InnerComponent => {
    return (props) => {
        return (
            <div>
                <InnerComponent
                    {...props}
                    className={`gmx-sidebar-${props.inputType}-with-addon-small`}
                />
                <Button
                    className="gmx-addon-button-medium"
                    onClick={props.onButtonClick}
                >
                </Button>
            </div>
        )
    }
}
