import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/logout');
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogoutClick}>
            Logout
        </Button>
    );
};

export default LogoutButton;