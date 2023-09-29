import React from 'react';
import './button.css';

function Button(props) {
    const { type, text } = props;
    return (
        <button className={type === 'primary' ? 'primary-button' : 'ghost-button'}>
            {text}
        </button>
    )

}

export default Button