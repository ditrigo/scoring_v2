import React from 'react';

const MyButton = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="btn col btn-outline-primary float-left mt-3">
            {children}
        </button>
    );
}

export default MyButton;
