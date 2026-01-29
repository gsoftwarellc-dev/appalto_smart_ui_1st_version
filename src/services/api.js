import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Placeholder for Laravel API
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Mock API responses for MVP (since backend is not ready)
export const mockLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock logic
            if (email.includes('admin')) {
                resolve({
                    user: {
                        id: 1,
                        name: 'Admin User',
                        email: email,
                        role: 'admin'
                    },
                    token: 'mock-admin-token'
                });
            } else if (email.includes('contractor')) {
                resolve({
                    user: {
                        id: 2,
                        name: 'Contractor User',
                        email: email,
                        role: 'contractor',
                        credits: 50
                    },
                    token: 'mock-contractor-token'
                });
            } else if (email.includes('owner')) {
                resolve({
                    user: {
                        id: 3,
                        name: 'Platform Owner',
                        email: email,
                        role: 'owner'
                    },
                    token: 'mock-owner-token'
                });
            } else {
                reject(new Error('Invalid credentials. Use "admin" or "contractor" in email.'));
            }
        }, 1000);
    });
};

export default api;
