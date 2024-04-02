import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Grid, Paper, Typography} from '@mui/material';
import axios from "axios";

const CategoryImages: React.FC = () => {
    const {categoryName} = useParams<'categoryName'>();
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/files/${categoryName}`);
                setImages(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch images:', error);
            }
        };

        if (categoryName) {
            fetchImages();
        }
    }, [categoryName]);

    return (
        <Grid container spacing={2} padding={'20px'}>
            <Typography variant="h4" style={{marginBottom: '20px', width: '100%'}}>{categoryName}</Typography>
            {images.map((src, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Paper elevation={3} style={{padding: '20px', display: 'flex', justifyContent: 'center'}}>
                        <img
                            src={`/${categoryName}/${src}`} alt={`${categoryName} ${index + 1}`} style={{width: '100%', height: 'auto'}}/>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoryImages;
