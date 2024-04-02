// components/AppBarNavigation.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AppBarNavigation: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Proiect SE
                </Typography>
                <Button color="inherit" component={Link} to="/">Upload</Button>
                <Button color="inherit" component={Link} to="/categorii">Categorii</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarNavigation;
