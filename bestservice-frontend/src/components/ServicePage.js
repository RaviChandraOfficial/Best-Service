import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaDollarSign, FaTools, FaStar } from 'react-icons/fa';

const ServicePage = ({ serviceType, icon, description }) => {
  const navigate = useNavigate();

  return (
    <div className="service-page">
      <nav className="back-nav">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Services
        </button>
      </nav>

      <div className="service-banner">
        <div className="banner-content">
          <div className="service-icon">
            {icon}
          </div>
          <div className="banner-text">
            <h1>{serviceType} Centers</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className="service-centers-grid">
        {/* Service Center Card Example */}
        <div className="service-center-card">
          <span className="status-badge authorized">Authorized</span>
          <div className="center-details">
            <h3>Center Name</h3>
            
            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <span className="detail-label">Location:</span>
              <span className="detail-value">City Name</span>
            </div>

            <div className="detail-item">
              <FaStar className="detail-icon" />
              <span className="detail-label">Rating:</span>
              <div className="rating">
                <span className="detail-value">4.5 / 5</span>
              </div>
            </div>

            <div className="detail-item">
              <FaDollarSign className="detail-icon" />
              <span className="detail-label">Price Range:</span>
              <span className="detail-value">$$</span>
            </div>

            <div className="detail-item">
              <FaTools className="detail-icon" />
              <span className="detail-label">Services:</span>
              <span className="detail-value">Type A, Type B</span>
            </div>
          </div>
          
          <button className="book-service-btn">Book Service</button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage; 