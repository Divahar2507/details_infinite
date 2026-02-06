import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaPowerOff } from 'react-icons/fa';

const Navbar = () => {
    return (
        <header>
            {/* Top Toolbar */}
            <div className="top-nav">
                <div className="top-nav-logo">
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                        <span style={{ color: '#d93025', fontSize: '24px' }}>1</span>
                        <span style={{ color: 'black' }}>form</span>
                    </div>
                </div>
                <div className="top-nav-links">
                    <Link to="/">Renters</Link>
                    <Link to="/">Property Managers</Link>
                </div>
                <div className="top-nav-user">
                    <FaUserCircle size={18} />
                    <span>My Account</span>
                    <button className="btn-logout">Logout</button>
                </div>
            </div>

            {/* Main Title Area */}
            <div className="app-header">
                <h1>Online Rental Application</h1>
            </div>
        </header>
    );
};

export default Navbar;
