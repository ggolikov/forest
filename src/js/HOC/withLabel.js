import React from 'react';
import Label from '../components/Label';

export const withLabel = InnerComponent => {
    return (props) => {
        const { label, labelSize } = props;

        const elem = label ? (
            <div className={"gmx-sidebar-labeled-block"}>
                <Label size={labelSize}>
                    {label}
                </Label>
                <InnerComponent {...props}/>
            </div>
        ) : <InnerComponent {...props}/>;

        return elem;
    }
}
