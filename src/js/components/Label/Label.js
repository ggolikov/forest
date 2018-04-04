import React from 'react';
import './index.sass';

const Label = (props) => {
    const { txt, size } = props;
    const prefix = size ? `-${size}` : '';

    return (
        <div className={`gmx-sidebar-label${prefix}`}>
            {txt}
        </div>
    );
}

export default Label;
