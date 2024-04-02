// components/CategoriesScreen.tsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories: string[] = [
    "Belts",
    "Dress",
    "Jackets",
    "Socks",
    "Trousers",
    "T-Shirt"
];


const CategoriesScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleDoubleClick = (category: string) => {
        navigate(`/category/${category}`);
    };

    return (
        <Grid container spacing={2} padding={'20px'}>
            {categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category} onDoubleClick={() => handleDoubleClick(category)}>
                    <Paper elevation={3} style={{ padding: '20px', cursor: 'pointer' }}>
                        <Typography variant="h5">{category}</Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoriesScreen;
