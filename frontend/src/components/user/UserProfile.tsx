import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per il redirect
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Alert,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { User } from "../../services/auth-service";

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
  });
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook per il redirect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Errore sconosciuto";
      setError(`Errore durante l'aggiornamento del profilo: ${errorMessage}`);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" color="primary">
            Il Tuo Profilo
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant={isEditing ? "contained" : "outlined"}
              color={isEditing ? "success" : "primary"}
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
            >
              {isEditing ? "Salva" : "Modifica"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/products")} // Redirect alla pagina dei prodotti
            >
              Vai ai Prodotti
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component={isEditing ? "form" : "div"}
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: "calc(50% - 8px)" }}>
              <TextField
                label="Nome"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
                disabled={!isEditing}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: "calc(50% - 8px)" }}>
              <TextField
                label="Cognome"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
                disabled={!isEditing}
              />
            </Box>
          </Box>
          <Box>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isEditing}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}