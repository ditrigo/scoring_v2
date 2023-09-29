import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Navbar from "../components/UI/Navbar/Navbar";
import AppRouter from "../components/AppRouter";

function MainPage() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default MainPage;
