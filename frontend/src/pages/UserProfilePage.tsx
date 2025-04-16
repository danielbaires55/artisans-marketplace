import { useState, useEffect } from 'react';
import { Container, CircularProgress, Alert } from '@mui/material';
import UserProfile from '../components/user/UserProfile';
import { userApi } from '../services/api';

export default function UserProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            setLoading(true);
            // TODO: Implementare la chiamata API per ottenere i dati dell'utente
            const response = await userApi.getCurrentUser();
            setUser(response.data);
        } catch (err) {
            setError('Errore nel caricamento del profilo. Riprova più tardi.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (updatedData: any) => {
        try {
            // TODO: Implementare la chiamata API per aggiornare i dati dell'utente
            const response = await userApi.updateProfile(updatedData);
            setUser(response.data);
        } catch (err) {
            throw new Error('Errore durante l\'aggiornamento del profilo');
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="info">Utente non trovato</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <UserProfile user={user} onUpdate={handleUpdateProfile} />
        </Container>
    );
} 