import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBarNavigation from "./AppBarNavigation";
import CategoriesScreen from "./CategoriesScreen";
import ImageUploader from "./ImageUploader";

function App() {
    return (
        <Router>
            <AppBarNavigation />
            <Routes>
                <Route path="/" element={<ImageUploader />} />
                <Route path="/categorii" element={<CategoriesScreen />} />
            </Routes>
        </Router>
    );
}

export default App;
