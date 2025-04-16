import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Typography, 
    Paper, 
    Button, 
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { productApi } from '../services/api';
import { Product } from '../types';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const response = await productApi.getById(Number(id));
                console.log('API Response:', response.data);
                setProduct(response.data);
            } catch (err) {
                console.error('Errore nel caricamento del prodotto:', err);
                setError('Errore nel caricamento del prodotto. Riprova più tardi.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProduct();
        }
    }, [id]);

    useEffect(() => {
        console.log('Product state:', product);
    }, [product]);

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

    if (!product) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="info">Prodotto non trovato</Alert>
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
            
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 4
                }}>
                    {/* Immagine del prodotto */}
                    <Box>
                        <Box
                            component="img"
                            src={`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/products/${product.id}/image`}
                            alt={product.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: 500,
                                objectFit: 'cover',
                                borderRadius: 2
                            }}
                        />
                    </Box>

                    {/* Informazioni del prodotto */}
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {product.name}
                        </Typography>
                        
                        <Typography variant="h5" color="primary" gutterBottom>
                            €{product.price.toFixed(2)}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom>
                            Dettagli del Prodotto
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.details || 'Nessun dettaglio disponibile'}
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Disponibilità: {product.stockQuantity} pezzi
                            </Typography>
                            {product.artisan && (
                                <Typography variant="body2" color="text.secondary">
                                Artigiano:{' '}
                                <Button
                                    onClick={() => navigate(`/artisans/${product.artisan!.id}`)}
                                    sx={{ 
                                        p: 0, 
                                        textTransform: 'none',
                                        minWidth: 'auto',
                                        verticalAlign: 'baseline',
                                        color: 'primary.main'
                                    }}
                                >
                                    {product.artisan!.name}
                                </Button>
                            </Typography>
                            )}
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCartIcon />}
                            fullWidth
                            sx={{ mt: 4 }}
                            disabled={product.stockQuantity === 0}
                        >
                            {product.stockQuantity > 0 ? 'Aggiungi al Carrello' : 'Non disponibile'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
} 