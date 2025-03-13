import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServiceCenters } from '../api/api';

const Dashboard = () => {
    const [serviceCenters, setServiceCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to fetch service centers
    const fetchServiceCenters = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getServiceCenters();
            setServiceCenters(response.data);
        } catch (err) {
            setError('Failed to fetch service centers.');
        }
        setLoading(false);
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear token
        navigate('/');  // Redirect to login
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Welcome to the Dashboard</h2>
            
            {/* Fetch Service Centers Button */}
            <button onClick={fetchServiceCenters} style={{ padding: '10px', margin: '10px', cursor: 'pointer' }}>
                Fetch Nearby Service Centers
            </button>

            {/* Display Loading */}
            {loading && <p>Loading service centers...</p>}

            {/* Display Error */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display Service Centers */}
            {serviceCenters.length > 0 ? (
                <ul>
                    {serviceCenters.map((center, index) => (
                        <li key={index}>
                            <strong>{center.name}</strong> - {center.location} (⭐ {center.rating})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No service centers found.</p>
            )}

            {/* Logout Button */}
            <button onClick={handleLogout} style={{ padding: '10px', margin: '10px', cursor: 'pointer', background: 'red', color: 'white' }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
