import { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import ProductList from '../components/products/ProductList';
import { productApi } from '../services/api';
import { Product } from '../types';

export default function ProductsPage() {
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
