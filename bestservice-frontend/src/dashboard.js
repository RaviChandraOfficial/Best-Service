import React, { useEffect, useState } from 'react';
import { fetchServiceCenters } from '../api/api';

const Dashboard = () => {
    const [serviceCenters, setServiceCenters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchServiceCenters();
                setServiceCenters(response.data.data);
            } catch (error) {
                console.error('Error fetching service centers');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Available Service Centers</h3>
            <ul>
                {serviceCenters.map((center) => (
                    <li key={center.id}>{center.username} - {center.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
