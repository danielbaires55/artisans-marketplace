import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
 
    CircularProgress, 
    Alert,
    Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { artisanApi, productApi } from '../services/api';
import ArtisanProfile from '../components/artisan/ArtisanProfile';
import { Artisan, Product } from '../types';

export default function ArtisanProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artisan, setArtisan] = useState<Artisan | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadArtisanData = async () => {
            try {
                setLoading(true);
                const [artisanResponse, productsResponse] = await Promise.all([
                    artisanApi.getById(Number(id)),
                    productApi.getByArtisan(Number(id))
                ]);
                
                setArtisan(artisanResponse.data);
                setProducts(productsResponse.data);
            } catch (err) {
                console.error('Errore nel caricamento dei dati:', err);
                setError('Errore nel caricamento dei dati dell\'artigiano.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadArtisanData();
        }
    }, [id]);

    const handleUpdateArtisan = async (updatedData: Partial<Artisan>) => {
        try {
            const response = await artisanApi.update(Number(id), updatedData);
            setArtisan(response.data);
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

    if (!artisan) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="info">Artigiano non trovato</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 4 }}
            >
                Torna indietro
            </Button>
            
            <ArtisanProfile
                artisan={artisan}
                products={products}
                onUpdate={handleUpdateArtisan}
                isEditable={false} // Impostare a true se l'utente è l'artigiano stesso
            />
        </Container>
    );
} 