import React, {useState} from 'react';
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";

import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <>
            {isAuth ? <MainPage /> : <StartPage setIsAuth={setIsAuth} />}
        </>
    );
}

export default App;
