import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BikeServices = () => {
    const [serviceCenters, setServiceCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBikeServiceCenters();
    }, []);

    const fetchBikeServiceCenters = async () => {
        try {
            const response = await axios.get('http://localhost:8080/service-centers');
            // Filter centers that handle bikes
            const bikeServices = response.data.data.filter(center => 
                center.bike_types && center.bike_types.toLowerCase().includes('bike')
            );
            setServiceCenters(bikeServices);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching bike service centers:', err);
            setError('Failed to load service centers');
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Loading service centers...</p>
        </div>
    );

    if (error) return (
        <div className="error-container">
            <p>{error}</p>
        </div>
    );

    return (
        <div className="bike-services-container">
            <div className="service-header">
                <h1>Bike Service Centers</h1>
                <p>Find the best bike service centers near you</p>
            </div>
            
            {serviceCenters.length === 0 ? (
                <div className="no-services">
                    <p>No bike service centers found.</p>
                </div>
            ) : (
                <div className="service-centers-grid">
                    {serviceCenters.map((center) => (
                        <div key={center.id} className="service-center-card">
                            <div className="card-header" style={{ backgroundColor: center.service_type === 'authorized' ? '#4CAF50' : '#2196F3' }}>
                                <span className="service-type-badge">
                                    {center.service_type}
                                </span>
                            </div>
                            <div className="card-content">
                                <h2>{center.username}</h2>
                                <div className="center-details">
                                    <p><strong>Location:</strong> {center.location}</p>
                                    <p><strong>Rating:</strong> {center.rating} ⭐</p>
                                    <p><strong>Price Range:</strong> {center.price_range}</p>
                                    <p><strong>Bike Types:</strong> {center.bike_types}</p>
                                </div>
                                <button className="book-button">Book Service</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BikeServices; 