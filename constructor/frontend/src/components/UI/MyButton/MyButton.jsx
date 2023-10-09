import React from 'react';
import '../../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';

const MyButton = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="btn btn-outline-primary">
            {children}
        </button>
    );
}

export default MyButton;
