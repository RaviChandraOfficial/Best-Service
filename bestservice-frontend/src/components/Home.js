import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

// Memoized Button component for better performance
const ActionButton = memo(({ onClick, primary, children }) => (
    <button
        onClick={onClick}
        style={{
            padding: '15px 35px',
            background: primary 
                ? 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)'
                : 'transparent',
            color: '#fff',
            border: primary ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            backdropFilter: primary ? 'none' : 'blur(5px)',
            minWidth: '140px'
        }}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    >
        {children}
    </button>
));

ActionButton.displayName = 'ActionButton';

// Memoized Feature Card component
const FeatureCard = memo(({ icon, title }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        minWidth: '200px'
    }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <span style={{ 
            color: '#fff',
            fontSize: '1rem',
            fontWeight: '500'
        }}>{title}</span>
    </div>
));

FeatureCard.displayName = 'FeatureCard';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Static gradient overlays for visual effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                zIndex: 1
            }}>
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
            </div>

            {/* Main content */}
            <main style={{
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '50px'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '700',
                        color: '#fff',
                        marginBottom: '20px',
                        lineHeight: '1.2'
                    }}>
                        Welcome to{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block'
                        }}>
                            Best Service
                        </span>
                    </h1>
                    
                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        maxWidth: '600px',
                        margin: '0 auto 40px',
                        lineHeight: '1.6'
                    }}>
                        Your one-stop destination for quality services. Join our community today!
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '60px'
                    }}>
                        <ActionButton 
                            primary 
                            onClick={() => navigate('/login')}
                        >
                            Get Started
                        </ActionButton>
                        <ActionButton 
                            onClick={() => navigate('/register')}
                        >
                            Learn More
                        </ActionButton>
                    </div>

                    {/* Features section */}
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <FeatureCard icon="⚡" title="Fast & Reliable" />
                        <FeatureCard icon="👥" title="Expert Team" />
                        <FeatureCard icon="🛡️" title="Secure Service" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default memo(Home); 