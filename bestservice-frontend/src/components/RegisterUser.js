import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, password, user_type: "customer" });
            navigate('/');
        } catch (err) {
            setError('Registration failed!');
        }
    };

    return (
        <div className="container">
            <h2>Register User</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterUser;
