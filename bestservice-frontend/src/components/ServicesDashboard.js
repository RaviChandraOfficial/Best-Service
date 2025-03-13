import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaMotorcycle, 
    FaCar, 
    FaTools, 
    FaBolt, 
    FaSnowflake,
    FaUser,
    FaSignOutAlt,
    FaArrowLeft
} from 'react-icons/fa';
import { 
    MdPlumbing, 
    MdComputer,
    MdCleaningServices,
    MdHandyman,
    MdElectricalServices
} from 'react-icons/md';
import { GiWashingMachine } from 'react-icons/gi';

const ServicesDashboard = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'User';

    const services = [
        {
            id: 1,
            name: 'Bike Services',
            icon: <FaMotorcycle size={32} />,
            description: 'Professional bike repair and maintenance services',
            path: 'bike',
            color: '#0ea5e9'
        },
        {
            id: 2,
            name: 'Car Services',
            icon: <FaCar size={32} />,
            description: 'Expert car repair and maintenance solutions',
            path: 'car',
            color: '#14b8a6'
        },
        {
            id: 3,
            name: 'Home Appliances',
            icon: <GiWashingMachine size={32} />,
            description: 'Repair services for all home appliances',
            path: 'appliance',
            color: '#f59e0b'
        },
        {
            id: 4,
            name: 'Electrical Services',
            icon: <MdElectricalServices size={32} />,
            description: 'Professional electrical repair and installation',
            path: 'electrical',
            color: '#6366f1'
        },
        {
            id: 5,
            name: 'AC & Refrigeration',
            icon: <FaSnowflake size={32} />,
            description: 'AC and refrigerator maintenance services',
            path: 'ac-fridge',
            color: '#3b82f6'
        },
        {
            id: 6,
            name: 'Plumbing',
            icon: <MdPlumbing size={32} />,
            description: 'Expert plumbing repair and installation',
            path: 'plumbing',
            color: '#8b5cf6'
        },
        {
            id: 7,
            name: 'Electronics',
            icon: <FaBolt size={32} />,
            description: 'Electronics repair and maintenance',
            path: 'electronics',
            color: '#ec4899'
        },
        {
            id: 8,
            name: 'Computer Services',
            icon: <MdComputer size={32} />,
            description: 'Computer repair and IT support',
            path: 'computer',
            color: '#22c55e'
        },
        {
            id: 9,
            name: 'Home Cleaning',
            icon: <MdCleaningServices size={32} />,
            description: 'Professional home cleaning services',
            path: 'cleaning',
            color: '#06b6d4'
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="portal-container">
            <div className="service-nav">
                <div className="nav-content-wrapper">
                    <button onClick={() => navigate('/')} className="back-nav-button">
                        <FaArrowLeft /> Back to Home
                    </button>
                    <button onClick={handleLogout} className="logout-nav-button">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            <div className="portal-header">
                <div className="header-content">
                    <div className="user-welcome">
                        <FaUser className="user-icon" />
                        <div>
                            <h1>Welcome, {username}</h1>
                            <p>Choose from our wide range of professional services</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="services-wrapper">
                <div className="services-grid">
                    {services.map((service) => (
                        <div 
                            key={service.id} 
                            className="service-card"
                            onClick={() => navigate(`/services/${service.path}`)}
                            style={{ '--service-color': service.color }}
                        >
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <div className="service-content">
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <button className="view-button">
                                    View Services
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesDashboard; 