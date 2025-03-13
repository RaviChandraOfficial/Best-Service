import React, { useState } from 'react';
import axios from 'axios';

function RegisterServiceCenter() {
  const [centerData, setCenterData] = useState({
    username: '',
    location: '',
    rating: '',
    price_range: '',
    bike_types: '',
    service_type: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleRegisterCenter = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/register-service-center',
        centerData
      );
      setMessage(response.data);
    } catch (error) {
      setMessage('Error registering service center');
    }
  };

  return (
    <div>
      <h2>Register Service Center</h2>
      <input
        type="text"
        placeholder="Username"
        value={centerData.username}
        onChange={(e) => setCenterData({ ...centerData, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={centerData.location}
        onChange={(e) => setCenterData({ ...centerData, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="Rating"
        value={centerData.rating}
        onChange={(e) => setCenterData({ ...centerData, rating: e.target.value })}
      />
      <input
        type="text"
        placeholder="Price Range"
        value={centerData.price_range}
        onChange={(e) => setCenterData({ ...centerData, price_range: e.target.value })}
      />
      <input
        type="text"
        placeholder="Bike Types"
        value={centerData.bike_types}
        onChange={(e) => setCenterData({ ...centerData, bike_types: e.target.value })}
      />
      <input
        type="text"
        placeholder="Service Type"
        value={centerData.service_type}
        onChange={(e) => setCenterData({ ...centerData, service_type: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={centerData.password}
        onChange={(e) => setCenterData({ ...centerData, password: e.target.value })}
      />
      <button onClick={handleRegisterCenter}>Register Service Center</button>
      <p>{message}</p>
    </div>
  );
}

export default RegisterServiceCenter;
