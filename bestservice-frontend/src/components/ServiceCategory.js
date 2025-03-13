import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMotorcycle, FaMapMarkerAlt, FaStar, FaDollarSign, FaTools, FaArrowLeft } from 'react-icons/fa';

const ServiceCategory = () => {
    const [serviceCenters, setServiceCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchServiceCenters();
    }, [category]);

    const fetchServiceCenters = async () => {
        try {
            const response = await axios.get('http://localhost:8080/service-centers');
            console.log('All service centers:', response.data);
            if (category === 'bike') {
                setServiceCenters(response.data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching service centers:', err);
            setError('Failed to load service centers. ' + err.message);
            setLoading(false);
        }
    };

    return (
        <div className="bike-service-container">
            <div className="service-nav">
                <button onClick={() => navigate('/dashboard')} className="back-nav-button">
                    <FaArrowLeft /> Back to Services
                </button>
            </div>

            <div className="service-header">
                <div className="header-content">
                    <FaMotorcycle className="header-icon" />
                    <div>
                        <h1>Bike Service Centers</h1>
                        <p>Find and book the best bike service centers near you</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading service centers...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={() => navigate('/dashboard')} className="back-button">
                        Back to Dashboard
                    </button>
                </div>
            ) : (
                <div className="service-centers-wrapper">
                    <div className="service-centers-grid">
                        {serviceCenters.map((center) => (
                            <div key={center.id} className="service-card">
                                <div className={`card-badge ${center.service_type}`}>
                                    {center.service_type}
                                </div>
                                <div className="card-main">
                                    <h2>{center.username}</h2>
                                    
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <FaMapMarkerAlt className="info-icon" />
                                            <div>
                                                <label>Location</label>
                                                <span>{center.location}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="info-item">
                                            <FaStar className="info-icon star" />
                                            <div>
                                                <label>Rating</label>
                                                <span>{center.rating} / 5</span>
                                            </div>
                                        </div>
                                        
                                        <div className="info-item">
                                            <FaDollarSign className="info-icon" />
                                            <div>
                                                <label>Price Range</label>
                                                <span>{center.price_range}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="info-item">
                                            <FaTools className="info-icon" />
                                            <div>
                                                <label>Services</label>
                                                <span>{center.bike_types}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="book-button">
                                        Book Service
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceCategory; 