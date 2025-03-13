import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceService } from '../services/api';

function ServiceProviderList() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [serviceCenters, setServiceCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchServiceCenters();
    }, []);

    const fetchServiceCenters = async () => {
        try {
            const response = await serviceService.getAllServiceCenters();
            setServiceCenters(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching service centers:', err);
            setError('Failed to load service centers');
            setLoading(false);
        }
    };

    if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>Loading...</div>;
    if (error) return <div style={{ color: '#ff4444', textAlign: 'center', padding: '40px' }}>{error}</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Service Centers</h2>
            {loading && <div className="glass-container">Loading...</div>}
            {error && <div className="glass-container error-message">{error}</div>}
            <div className="service-centers-grid">
                {serviceCenters.map((center) => (
                    <div key={center.id} className="service-center-card">
                        <h3>{center.username}</h3>
                        <p><strong>Location:</strong> {center.location}</p>
                        <p><strong>Rating:</strong> {center.rating} ⭐</p>
                        <p><strong>Price Range:</strong> {center.price_range}</p>
                        <p><strong>Bike Types:</strong> {center.bike_types}</p>
                        <p><strong>Service Type:</strong> {center.service_type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceProviderList; 