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
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            const token = user.token;
            if (token) {
                console.log('Token inviato:', token);
                config.headers.Authorization = `Bearer ${token}`;
            }
        } else {
            console.warn('Nessun utente trovato in localStorage.');
        }
        return config;
    },
    error => Promise.reject(error)
);


export default api; 