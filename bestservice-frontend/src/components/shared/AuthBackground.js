import React, { memo } from 'react';

const AuthBackground = memo(({ children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            padding: '20px',
            overflow: 'hidden'
        }}>
            {/* Simplified background effects */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: 0
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />
            </div>

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '450px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {children}
            </div>
        </div>
    );
});

AuthBackground.displayName = 'AuthBackground';

export default AuthBackground; 