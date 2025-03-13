import React, { useState } from 'react';
import axios from 'axios';

function LoginUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const user = { username, password };

    try {
      const response = await axios.post('http://localhost:8080/login-user', user);
      setToken(response.data.token);
      setMessage('Login successful');
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login User</h2>
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
      <button onClick={handleLogin}>Login</button>
      {token && <p>Token: {token}</p>}
      <p>{message}</p>
    </div>
  );
}

export default LoginUser;
