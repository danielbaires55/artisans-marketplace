import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Benvenuto su Artisan's Marketplace
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Scopri prodotti artigianali unici creati con passione
                </Typography>
                <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/products')}
                    sx={{
                        fontSize: '1.2rem',
                        padding: '12px 32px',
                        borderRadius: '28px',
                        textTransform: 'none'
                    }}
                >
                    Esplora i Prodotti
                </Button>
            </Box>
        </Container>
    );
}
