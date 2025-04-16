import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Alert } from '@mui/material';
import ProductList from '../components/products/ProductList';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';
import { Product } from '../types';

export default function ProductsPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const productsRes = await productApi.getAll();
                setProducts(productsRes.data);
            } catch (err) {
                console.error('Errore nel caricamento dei prodotti:', err);
                setError('Errore nel caricamento dei prodotti. Riprova più tardi.');
            }
        };
        loadData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}>
                {/* <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    gap: 2
                }}>
                    <Button 
                        variant="outlined"
                        onClick={() => navigate('/login')}
                    >
                        Accedi
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={() => navigate('/register')}
                    >
                        Registrati
                    </Button>
                </Box> */}

                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom
                    sx={{ mb: 4 }}
                >
                    I Nostri Prodotti Artigianali
                </Typography>
                {error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <ProductList products={products} categories={[]} />
                )}
            </Box>
        </Container>
    );
}
