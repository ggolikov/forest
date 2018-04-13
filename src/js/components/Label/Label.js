import React from 'react';
import './index.sass';

const Label = (props) => {
    const { size, children } = props;
    const prefix = size ? `-${size}` : '';

    return (
        <div className={`gmx-sidebar-label${prefix}`}>
            {children}
        </div>
    );
}

export default Label;
