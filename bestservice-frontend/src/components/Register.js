import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState('customer');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        location: '',
        rating: 4.5,
        price_range: '$$',
        bike_types: '',
        service_type: 'authorized'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            if (accountType === 'customer') {
                const response = await axios.post('http://localhost:8080/register', {
                    username: formData.username,
                    password: formData.password,
                    user_type: 'customer'
                });
                console.log('User registration response:', response.data);
                navigate('/login');
            } else {
                // Exactly matching the ServiceCenter struct including id
                const serviceCenterData = {
                    id: 0,  // Added this field as it's required by the struct
                    username: formData.username,
                    password: formData.password,
                    location: formData.location,
                    rating: 4.5,
                    price_range: "$$",
                    bike_types: formData.bike_types,
                    service_type: formData.service_type
                };
                
                // Log the exact data being sent
                console.log('Sending service center data:', JSON.stringify(serviceCenterData, null, 2));
                
                const response = await axios.post('http://localhost:8080/register-service-center', serviceCenterData);
                console.log('Service center registration response:', response.data);
                navigate('/login');
            }
        } catch (err) {
            console.error('Registration error:', err);
            // Add more detailed error logging
            if (err.response) {
                console.error('Error response data:', err.response.data);
                console.error('Error response status:', err.response.status);
                console.error('Error response headers:', err.response.headers);
            }
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="glass-container">
            <h2>Create Account</h2>
            <div className="type-selector">
                <button 
                    className={accountType === 'customer' ? 'active' : ''}
                    onClick={() => setAccountType('customer')}
                >
                    Customer
                </button>
                <button 
                    className={accountType === 'service_center' ? 'active' : ''}
                    onClick={() => setAccountType('service_center')}
                >
                    Service Center
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {accountType === 'service_center' && (
                    <>
                        <div className="form-group">
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="bike_types"
                                placeholder="Bike Types (e.g., Sport, Cruiser)"
                                value={formData.bike_types}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="price_range"
                                value={formData.price_range}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            >
                                <option value="$">$</option>
                                <option value="$$">$$</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                name="service_type"
                                value={formData.service_type}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            >
                                <option value="authorized">authorized</option>
                                <option value="private">private</option>
                            </select>
                        </div>
                    </>
                )}
                <button type="submit">Register</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: 'white' }}>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Register;
