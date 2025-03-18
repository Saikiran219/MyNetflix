// src/axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api/',
});

// Request Interceptor to add token to headers
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response Interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) { 
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;