import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaUserCircle } from 'react-icons/fa';
import { MdBusinessCenter, MdLocationOn } from 'react-icons/md';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: 0,
        username: '',
        password: '',
        user_type: 'service_center',
        location: '',
        rating: 4.5,
        price_range: '$$',
        bike_types: '',
        service_type: 'authorized'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Sending registration data:', formData);

            const response = await axios.post('http://localhost:8080/register-service-center', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Registration response:', response);

            if (response.status === 200 || response.status === 201) {
                alert('Registration successful! Please login.');
                navigate('/login');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Register</h1>
                        <p>Create your account today!</p>
                    </div>
                    <div className="auth-type-selector">
                        <button 
                            className={`type-button ${formData.user_type === 'customer' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, user_type: 'customer' })}
                        >
                            <FaUserCircle /> Customer
                        </button>
                        <button 
                            className={`type-button ${formData.user_type === 'service_center' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, user_type: 'service_center' })}
                        >
                            <MdBusinessCenter /> Service Center
                        </button>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Account Type:</label>
                            <select 
                                value={formData.user_type}
                                onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                            >
                                <option value="customer">Customer</option>
                                <option value="service_center">Service Center</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="e.g., speed_motors"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter secure password"
                            />
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                placeholder="e.g., New York"
                            />
                        </div>
                        <div className="form-group">
                            <label>Bike Types (comma separated):</label>
                            <input
                                type="text"
                                name="bike_types"
                                value={formData.bike_types}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Sport, Cruiser"
                            />
                        </div>
                        <div className="form-group">
                            <label>Price Range:</label>
                            <select
                                name="price_range"
                                value={formData.price_range}
                                onChange={handleChange}
                            >
                                <option value="$">$</option>
                                <option value="$$">$$</option>
                                <option value="$$$">$$$</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Service Type:</label>
                            <select
                                name="service_type"
                                value={formData.service_type}
                                onChange={handleChange}
                            >
                                <option value="authorized">Authorized</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? 'Registering...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="auth-footer">
                        <p>Already have an account? <span onClick={() => navigate('/login')} className="link">Login here</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
