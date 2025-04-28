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
            console.warn('Token scaduto o non autorizzato. Reindirizzamento al login.');
            // Rimuovi il token solo se necessario
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
        const token = localStorage.getItem('token'); // Cerca il token direttamente
        if (token) {
            console.log('Token inviato:', token);
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('Nessun token trovato in localStorage.');
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;