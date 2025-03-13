import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if logged in

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear token from storage
        navigate('/');  // Redirect to login page
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#333', color: '#fff' }}>
            <div>
                <Link to="/" style={{ color: 'white', marginRight: '10px' }}>Home</Link>
                {token ? <Link to="/dashboard" style={{ color: 'white', marginRight: '10px' }}>Dashboard</Link> : null}
            </div>
            <div>
                {token ? (
                    <button onClick={handleLogout} style={{ padding: '5px 10px', background: 'red', color: 'white', cursor: 'pointer' }}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
                        <Link to="/register" style={{ color: 'white' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
