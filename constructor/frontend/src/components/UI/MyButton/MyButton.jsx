import React from 'react';
import '../../../styles/App.css';

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
