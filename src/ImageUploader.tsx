import React, { ChangeEvent, useState } from 'react';
import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import { Image } from '@mui/icons-material';
import axios from "axios";

const ImageUploader: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const imagesArray = Array.from(event.target.files).filter(file =>
                file.type.match('image.*')
            );
            setSelectedImages(imagesArray);
        }
    };

    const uploadImages = async () => {
        const formData = new FormData();
        selectedImages.forEach(image => formData.append('images', image));

        try {
            const response = await axios.post('your_api_endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Images uploaded successfully!');
            setSelectedImages([]);
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Failed to upload images.');
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">Upload Images</Typography>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span">
                            Select Images
                        </Button>
                    </label>
                    <div style={{ marginTop: '20px' }}>
                        {selectedImages.map((image, index) => (
                            <Paper key={index} elevation={2} style={{ padding: '10px', margin: '10px 0' }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Image />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2">{image.name}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                        {selectedImages.length === 0 && <p>Nicio imagine selectata</p>}
                    </div>

                    <Box display={'flex'} justifyContent={'flex-end'} marginTop={'16px'}>
                        <Button variant="contained" color="primary" onClick={uploadImages} style={{ marginLeft: '10px' }}>
                            Upload
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ImageUploader;
