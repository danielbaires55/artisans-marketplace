import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleLogout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Rimuovi il token da localStorage
        localStorage.removeItem('token');
        console.log('Logout effettuato. Token rimosso.');

        // Reindirizza alla pagina di login
        navigate('/login');
    }, [navigate]);

    return null; // Non serve un'interfaccia utente per il logout
};

export default HandleLogout;