import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../components/UI/Navbar/Navbar";
import AppRouter from "../components/AppRouter";
import LoginPage from "./LoginPage";

function MainPage() {
    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <>
            {isAuth ?
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
                : <LoginPage />}
        </>


        // <BrowserRouter>
        //     <Navbar />
        //     <AppRouter />
        // </BrowserRouter>
    );
}

export default MainPage;
