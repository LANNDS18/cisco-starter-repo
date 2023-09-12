import React from 'react';
import './Exhibit.css';


const Exhibit = ({ name, children }) => {
    return (
        <div className="exhibit-container">
            <h1 className="exhibit-heading">{name}</h1>
            <div className="ExhibitContent">
                {children}
            </div>
        </div>
    );
};

export default Exhibit;
