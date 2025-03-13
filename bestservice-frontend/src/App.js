import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import PageBackground from './components/shared/PageBackground';
import ServiceProviderList from './components/ServiceProviderList';
import ServicesDashboard from './components/ServicesDashboard';
import BikeServices from './components/BikeServices';
import ServiceCategory from './components/ServiceCategory';
import './styles/main.css';

function App() {
    return (
        <Router>
            <PageBackground>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<ServicesDashboard />} />
                    <Route path="/services/:category" element={<ServiceCategory />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/service-centers" element={<ServiceProviderList />} />
                    <Route path="/bike-services" element={<BikeServices />} />
                </Routes>
            </PageBackground>
        </Router>
    );
}

// Update keyframes for a faster, more dynamic gradient
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        25% { background-position: 100% 50%; }
        50% { background-position: 100% 100%; }
        75% { background-position: 0% 100%; }
        100% { background-position: 0% 50%; }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes glow {
        from { text-shadow: 0 0 20px rgba(79, 172, 254, 0.3); }
        to { text-shadow: 0 0 30px rgba(79, 172, 254, 0.6); }
    }
`;
document.head.appendChild(styleSheet);

// Common container style to use in all components
const containerStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '60px 40px',
    maxWidth: '900px',
    width: '90%',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'fadeIn 1s ease-out',
    margin: '20px auto'
};

// Common input style
const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
};

// Common button style
const buttonStyle = {
    padding: '18px 40px',
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    boxShadow: '0 10px 20px rgba(79, 172, 254, 0.3)'
};

// Common heading style
const headingStyle = {
    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '700',
    letterSpacing: '-1px',
    textAlign: 'center'
};

export default App;
