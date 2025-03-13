import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaUserCircle } from 'react-icons/fa';
import { MdBusinessCenter } from 'react-icons/md';

const Login = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('customer');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = loginType === 'customer' ? '/login-user' : '/login-service-center';
            const response = await axios.post(`http://localhost:8080${endpoint}`, formData);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Please sign in to continue</p>
                    </div>

                    <div className="auth-type-selector">
                        <button 
                            className={`type-button ${loginType === 'customer' ? 'active' : ''}`}
                            onClick={() => setLoginType('customer')}
                        >
                            <FaUserCircle />
                            <span>Customer</span>
                        </button>
                        <button 
                            className={`type-button ${loginType === 'service_center' ? 'active' : ''}`}
                            onClick={() => setLoginType('service_center')}
                        >
                            <MdBusinessCenter />
                            <span>Service Center</span>
                        </button>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <div className="input-icon">
                                <FaUser />
                            </div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="input-icon">
                                <FaLock />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <a href="/register">Register here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
