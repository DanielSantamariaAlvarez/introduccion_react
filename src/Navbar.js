import React from 'react';
import './style/index.css';
import './style/navbar.css';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <span className=" mb-0">TODOs Application</span>
                </div>
            </nav> 
        </>
    );
}

export default Navbar;