import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState('user');
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your password reset logic here
        setResetSent(true);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh',
            padding: '20px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '20px',
                padding: '40px',
                width: '100%',
                maxWidth: '450px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(10px)',
                animation: 'fadeIn 0.5s ease-out'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#2c3e50',
                    marginBottom: '30px',
                    fontSize: '2rem',
                    fontWeight: '600'
                }}>Reset Password</h2>

                {/* Account Type Selector */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '30px',
                    background: 'rgba(0,0,0,0.05)',
                    padding: '5px',
                    borderRadius: '15px'
                }}>
                    {['user', 'service center'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setAccountType(type)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500',
                                background: accountType === type ? '#3498db' : 'transparent',
                                color: accountType === type ? 'white' : '#666',
                                transition: 'all 0.3s ease',
                                textTransform: 'capitalize'
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {!resetSent ? (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#34495e',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                placeholder={`Enter your ${accountType} email`}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                marginBottom: '20px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#2980b9';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#3498db';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Send Reset Link
                        </button>
                    </form>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        color: '#2ecc71',
                        marginBottom: '20px'
                    }}>
                        Password reset link has been sent to your email!
                    </div>
                )}

                <div style={{
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                    <a
                        onClick={() => navigate('/login')}
                        style={{
                            color: '#3498db',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword; 