import React from 'react';

const Preview = ({ state }) => {
    console.log(state);
    return (
        <div>
            JSON.stringify(state);
        </div>
    )
}

export default Preview;
