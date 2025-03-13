import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        return Promise.reject(error);
    }
);

export const authService = {
    // Login for regular users
    loginUser: async (credentials) => {
        return await api.post('/login-user', credentials);
    },

    // Login for service centers
    loginServiceCenter: async (credentials) => {
        return await api.post('/login-service-center', credentials);
    },

    // Register regular user
    registerUser: async (userData) => {
        return await api.post('/register', userData);
    },

    // Register service center
    registerServiceCenter: async (centerData) => {
        return await api.post('/register-service-center', centerData);
    }
};

export const serviceService = {
    // Get all service centers
    getAllServiceCenters: async () => {
        return await api.get('/service-centers');
    }
};

export default api; 