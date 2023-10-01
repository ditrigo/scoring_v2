import React, { useState, useEffect } from 'react';
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const [isAuth, setIsAuth] = useState(false)

    // useEffect(() => {
    //     if (localStorage.getItem('access_token') !== null) {
    //        setIsAuth(true); 
    //      }
    //    }, [isAuth]);

    return (
        // <>
            
        //     {isAuth ? <MainPage /> : <LoginPage />}
        // </>
        <MainPage />
    );
}

export default App;
