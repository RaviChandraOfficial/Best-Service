import React from 'react';

function PageBackground({ children }) {
    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            overflow: 'hidden'
        }}>
            {/* Static gradient overlays */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
            
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}

export default PageBackground; 