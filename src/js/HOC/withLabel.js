import React from 'react';

export const withLabel = InnerComponent => {
    return (props) => {
        const { label } = props;

        const elem = label ? (
            <div className={"forest-select-block"}>
                <div>
                    {label}
                </div>
                <InnerComponent {...props}/>
            </div>
        ) : <InnerComponent {...props}/>;

        return elem;
    }
}
