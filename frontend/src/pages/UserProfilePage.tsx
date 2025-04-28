import { useEffect, useState } from "react";
import UserProfile from "../components/user/UserProfile";
import LogoutButton from "../components/user/LogoutButton"; // Importa il pulsante di logout
import AuthService from "../services/auth-service";
import { User } from "../services/auth-service";

export default function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
          throw new Error("Utente non autenticato");
        }
        setUser({
          id: currentUser.id,
          email: currentUser.email,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          address: '', // Add default empty string if address is undefined
          createdAt: new Date().toISOString(), // Puoi aggiornare con un valore reale
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore sconosciuto");
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (updatedUser: Partial<User>) => {
    try {
      // Effettua la chiamata API per aggiornare i dati dell'utente
      const updatedProfile = await AuthService.updateUserProfile(updatedUser);
      console.log("Profilo aggiornato:", updatedProfile);
  
      // Aggiorna lo stato locale con i dati aggiornati
      setUser((prevUser) => (prevUser ? { ...prevUser, ...updatedProfile } : null));
    } catch (err) {
      console.error("Errore durante l'aggiornamento:", err);
      setError("Errore durante l'aggiornamento del profilo. Riprova più tardi.");
    }
  };

  if (error) {
    return <div>Errore: {error}</div>;
  }

  if (!user) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <UserProfile user={user} onUpdate={handleUpdate} />
      <LogoutButton /> {/* Aggiungi il pulsante di logout */}
    </div>
  );
}