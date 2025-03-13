import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const user = { username, password, user_type: userType };

    try {
      const response = await axios.post('http://localhost:8080/register', user);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Type"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default RegisterUser;
