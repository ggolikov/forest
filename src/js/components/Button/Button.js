import React from 'react';

const Button = (props) => {
    return (
        <button
            active={props.active}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;
