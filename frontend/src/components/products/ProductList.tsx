import { useEffect, useState } from 'react';
import { Product, Category } from '../../types';
import { 
    Box,
    Card,
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions, 
    Button,
    Container,
    CircularProgress,
    Alert,
    Grid,

} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import defaultProductImage from '../../assets/img/vaso.jpg';

interface ProductListProps {
    products: Product[];
    categories: Category[];
}

export default function ProductList({ products = [], categories = [] }: ProductListProps) {
    const [loading, setLoading] = useState(true);
    const [error] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, [products]);

    const getImageUrl = (productId: number) => {
        return `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/products/${productId}/image`;
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

    if (!products || products.length === 0) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="info">Nessun prodotto disponibile</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Prodotti Artigianali
            </Typography>
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                    xs: '1fr', 
                    sm: 'repeat(2, 1fr)', 
                    md: 'repeat(3, 1fr)' 
                }, 
                gap: 3 
            }}>
                {products.map((product) => (
                    <Card 
                        key={product.id} 
                        sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            '&:hover': {
                                boxShadow: 6
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={product.id ? getImageUrl(product.id) : defaultProductImage}
                            alt={product.name}
                            sx={{ 
                                objectFit: 'cover',
                                backgroundColor: 'background.paper' 
                            }}
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                console.log('Errore caricamento immagine:', product.id);
                                e.currentTarget.src = defaultProductImage;
                            }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {product.description}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                €{product.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Disponibili: {product.stockQuantity}
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
                        </CardContent>
                        <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
                            <Button 
                                variant="outlined"
                                size="small" 
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                Dettagli
                            </Button>
                            <Button 
                                variant="contained"
                                size="small" 
                                color="primary"
                                startIcon={<ShoppingCartIcon />}
                                disabled={product.stockQuantity === 0}
                            >
                                Aggiungi al Carrello
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Container>
    );
} 