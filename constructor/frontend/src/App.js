import React, { useState, useEffect } from 'react';
import MainPage from "./pages/MainPage";

import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    const [isAuth, setIsAuth] = useState(false)

    // useEffect(() => {
    //     if (localStorage.getItem('access_token') !== null) {
    //        setIsAuth(true);
    //      }
    //    }, [isAuth]);

    return (
            <div className="App">
                {/* {isAuth ? <MainPage /> : <LoginPage />} */}

                <MainPage />
            </div>
    );
}

export default App;
