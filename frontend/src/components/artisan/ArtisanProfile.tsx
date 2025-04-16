import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Alert,
    Divider,
    List,
    ListItem,
    Chip,
    Rating
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Artisan, Product } from '../../types';

interface ArtisanProfileProps {
    artisan: Artisan;
    products: Product[];
    onUpdate?: (updatedArtisan: Partial<Artisan>) => Promise<void>;
    isEditable?: boolean;
}

export default function ArtisanProfile({ 
    artisan, 
    products, 
    onUpdate,
    isEditable = false 
}: ArtisanProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: artisan.name,
        description: artisan.description,
        location: artisan.location
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
        
        try {
            if (onUpdate) {
                await onUpdate(formData);
                setIsEditing(false);
            }
        } catch (err) {
            setError('Errore durante l\'aggiornamento del profilo.');
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h5" component="h1">
                        Profilo Artigiano
                    </Typography>
                    {isEditable && (
                        <Button
                            variant="outlined"
                            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                            onClick={() => isEditing ? handleSubmit : setIsEditing(true)}
                        >
                            {isEditing ? 'Salva' : 'Modifica'}
                        </Button>
                    )}
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component={isEditing ? 'form' : 'div'} onSubmit={handleSubmit}>
                    <Box sx={{ mb: 4 }}>
                        {isEditing ? (
                            <>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Descrizione"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Località"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </>
                        ) : (
                            <>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Nome
                                    </Typography>
                                    <Typography variant="body1">
                                        {artisan.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Descrizione
                                    </Typography>
                                    <Typography variant="body1">
                                        {artisan.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Località
                                    </Typography>
                                    <Typography variant="body1">
                                        {artisan.location}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                    Prodotti dell'Artigiano
                </Typography>
                
                <List>
                    {products.length > 0 ? (
                        products.map(product => (
                            <ListItem
                                key={product.id}
                                sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    mb: 2
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 1
                                    }}>
                                        <Typography variant="subtitle1">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="primary">
                                            €{product.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {product.description}
                                    </Typography>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Chip
                                            label={`Disponibili: ${product.stockQuantity}`}
                                            color={product.stockQuantity > 0 ? 'success' : 'error'}
                                            size="small"
                                        />
                                        <Rating value={4} readOnly size="small" />
                                    </Box>
                                </Box>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Nessun prodotto disponibile
                        </Typography>
                    )}
                </List>
            </Paper>
        </Box>
    );
} 