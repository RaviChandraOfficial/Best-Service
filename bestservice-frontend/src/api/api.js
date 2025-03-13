import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const loginUser = async (userData) => {
    return axios.post(`${API_URL}/login-user`, userData);
};

export const loginServiceCenter = async (userData) => {
    return axios.post(`${API_URL}/login-service-center`, userData);
};

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const registerServiceCenter = async (serviceData) => {
    return axios.post(`${API_URL}/register-service-center`, serviceData);
};

// ✅ Updated function: Fetching nearby service centers based on user location
export const getServiceCenters = async (latitude, longitude) => {
    return axios.get(`${API_URL}/service-centers`, {
        params: { latitude, longitude },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};
