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
    ListItemText,
    Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { User } from '../../types';

interface UserProfileProps {
    user: User;
    onUpdate: (updatedUser: Partial<User>) => Promise<void>;
}

export default function UserProfile({ user, onUpdate }: UserProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address
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
            await onUpdate(formData);
            setIsEditing(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
            setError(`Errore durante l'aggiornamento del profilo: ${errorMessage}`);
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
                        Il Tuo Profilo
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                        onClick={() => isEditing ? handleSubmit : setIsEditing(true)}
                    >
                        {isEditing ? 'Salva' : 'Modifica'}
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component={isEditing ? 'form' : 'div'} onSubmit={handleSubmit}>
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 4
                    }}>
                        {isEditing ? (
                            <>
                                <TextField
                                    label="Nome"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Cognome"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Indirizzo"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </>
                        ) : (
                            <>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Nome
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.firstName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Cognome
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.lastName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.email}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Indirizzo
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.address}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                    I Tuoi Ordini Recenti
                </Typography>
                
                <List>
                    {(user.orders ?? []).length > 0 ? (
                        user.orders?.map(order => (
                            <ListItem
                                key={order.id}
                                sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    mb: 2
                                }}
                            >
                                <ListItemText
                                    primary={`Ordine #${order.id}`}
                                    secondary={
                                        <>
                                            <Typography variant="body2">
                                                Data: {new Date(order.orderDate).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="body2">
                                                Totale: €{order.totalAmount.toFixed(2)}
                                            </Typography>
                                        </>
                                    }
                                />
                                <Chip
                                    label={order.status}
                                    color={
                                        order.status === 'COMPLETED' ? 'success' :
                                        order.status === 'PENDING' ? 'warning' : 'default'
                                    }
                                    size="small"
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Nessun ordine recente
                        </Typography>
                    )}
                </List>
            </Paper>
        </Box>
    );
} 