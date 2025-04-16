import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Interceptor per gestire gli errori
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Gestione token scaduto o non autorizzato
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor per aggiungere il token alle richieste
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api; 