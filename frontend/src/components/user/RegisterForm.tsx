import { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../services/api';

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    address: string;
}

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        address: ''
    });
    const [error, setError] = useState('');

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

        if (formData.password !== formData.confirmPassword) {
            setError('Le password non coincidono');
            return;
        }
        
        try {
            const { confirmPassword, ...userData } = formData;
            await userApi.register(userData);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Errore durante la registrazione. Riprova più tardi.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: 500,
                mx: 'auto',
                p: 3
            }}
        >
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Registrati
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 2
                }}>
                    <TextField
                        label="Nome"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cognome"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                </Box>

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Indirizzo"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                />

                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 2,
                    mb: 3
                }}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Conferma Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mb: 2 }}
                >
                    Registrati
                </Button>

                <Typography align="center">
                    Hai già un account?{' '}
                    <Button
                        onClick={() => navigate('/login')}
                        sx={{ textTransform: 'none' }}
                    >
                        Accedi
                    </Button>
                </Typography>
            </Paper>
        </Box>
    );
}
