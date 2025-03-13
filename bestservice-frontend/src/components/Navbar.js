import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Only show navbar on pages other than home
    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav style={{
            padding: '15px 30px',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            zIndex: 2
        }}>
            <div 
                onClick={() => navigate('/')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                {/* Logo Icon */}
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    boxShadow: '0 0 20px rgba(79, 172, 254, 0.5)'
                }}>
                    <span style={{
                        color: '#fff',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>BS</span>
                </div>
                
                {/* Company Name */}
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Poppins', sans-serif",
                    textShadow: '0 0 20px rgba(79, 172, 254, 0.3)'
                }}>
                    Best Service
                </span>
            </div>
        </nav>
    );
}

export default Navbar;
