import React, { useState, useEffect } from 'react';
import { FaTools, FaTicketAlt, FaChartLine, FaCalendarAlt, FaUserClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ServiceCenterDashboard = () => {
  const navigate = useNavigate();
  const [activeTickets, setActiveTickets] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    totalRepairs: 0,
    completedRepairs: 0,
    pendingRepairs: 0,
    revenue: 0
  });

  // Fetch data from your API
  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchActiveTickets();
    // fetchMonthlyStats();
  }, []);

  return (
    <div className="service-center-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <h2>Service Center Dashboard</h2>
          <button className="logout-btn" onClick={() => navigate('/login')}>
            Logout
          </button>
        </div>
      </nav>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <FaTicketAlt />
          </div>
          <div className="stat-info">
            <h3>Active Tickets</h3>
            <p className="stat-number">{activeTickets.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaTools />
          </div>
          <div className="stat-info">
            <h3>Monthly Repairs</h3>
            <p className="stat-number">{monthlyStats.totalRepairs}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>Revenue</h3>
            <p className="stat-number">${monthlyStats.revenue}</p>
          </div>
        </div>
      </div>

      {/* Active Tickets */}
      <section className="tickets-section">
        <h2>Active Service Tickets</h2>
        <div className="tickets-grid">
          {activeTickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </span>
                <span className="ticket-number">#{ticket.id}</span>
              </div>
              <div className="ticket-details">
                <h3>{ticket.customerName}</h3>
                <p className="service-type">{ticket.serviceType}</p>
                <div className="ticket-info">
                  <span><FaCalendarAlt /> {ticket.date}</span>
                  <span><FaUserClock /> {ticket.time}</span>
                </div>
                <p className="description">{ticket.description}</p>
              </div>
              <button className="update-status-btn">Update Status</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServiceCenterDashboard; 