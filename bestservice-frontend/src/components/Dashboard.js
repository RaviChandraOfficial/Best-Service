import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServiceCenters } from '../api/api';

const serviceCategories = [
    { id: 'bike', name: 'Bike Service', icon: '🏍️' },
    { id: 'car', name: 'Car Service', icon: '🚗' },
    { id: 'washing-machine', name: 'Washing Machine', icon: '🧺' },
    { id: 'fridge', name: 'Refrigerator', icon: '❄️' },
    { id: 'ac', name: 'Air Conditioner', icon: '🌡️' },
    { id: 'tv', name: 'Television', icon: '📺' },
    { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
    { id: 'electrical', name: 'Electrical', icon: '⚡' }
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [serviceCenters, setServiceCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Memoized dashboard data to prevent unnecessary recalculations
    const dashboardData = useMemo(() => ({
        overview: {
            totalServices: 156,
            activeRequests: 23,
            completedServices: 89,
            satisfaction: 4.8
        },
        recentActivity: [
            { id: 1, type: 'Service Request', status: 'Pending', time: '2 hours ago' },
            { id: 2, type: 'Service Completed', status: 'Completed', time: '5 hours ago' },
            { id: 3, type: 'New Message', status: 'Unread', time: '1 day ago' }
        ]
    }), []);

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

    const handleCategoryClick = (categoryId) => {
        navigate(`/services/${categoryId}`);
    };

    const StatCard = ({ title, value, icon, color }) => (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            flex: '1 1 250px',
            minWidth: '250px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            animation: 'fadeIn 0.5s ease-out'
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <h3 style={{ 
                    color: '#fff',
                    margin: 0,
                    fontSize: '1.1rem',
                    opacity: 0.9
                }}>{title}</h3>
                <span style={{ 
                    color: color,
                    fontSize: '1.5rem'
                }}>{icon}</span>
            </div>
            <div style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: color
            }}>{value}</div>
        </div>
    );

    return (
        <div style={{
            padding: '40px 20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    color: '#fff',
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    Select a Service Category
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '25px',
                    padding: '20px'
                }}>
                    {serviceCategories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '15px',
                                padding: '30px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                textAlign: 'center'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '15px'
                            }}>
                                {category.icon}
                            </div>
                            <h3 style={{
                                color: '#fff',
                                fontSize: '1.2rem',
                                marginBottom: '10px'
                            }}>
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
