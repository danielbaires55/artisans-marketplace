import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth-service'; 

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect se già loggato
    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            navigate('/products');
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Effettua il login tramite AuthService
            const response = await AuthService.login(formData);

            // Salva il token in localStorage
            localStorage.setItem('token', response.token);
            console.log('Login effettuato con successo. Token salvato:', response.token);

            // Reindirizza all'area protetta
            navigate('/profile'); // Dashboard in futuro
        } catch (err) {
            console.error('Errore durante il login:', err);
            setError('Errore durante il login. Verifica le tue credenziali.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: 400,
                mx: 'auto',
                p: 3
            }}
        >
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Accedi
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        margin="normal"
                        disabled={loading}
                    />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        margin="normal"
                        disabled={loading}
                    />
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mb: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Accedi'}
                </Button>

                <Typography align="center">
                    Non hai un account?{' '}
                    <Button
                        onClick={() => navigate('/register')}
                        sx={{ textTransform: 'none' }}
                        disabled={loading}
                    >
                        Registrati
                    </Button>
                </Typography>
            </Paper>
        </Box>
    );
}