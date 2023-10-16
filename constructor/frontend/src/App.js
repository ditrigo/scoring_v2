import React from 'react';
// import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import "./styles/App.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    // const [isAuth, setIsAuth] = useState(false)

    // useEffect(() => {
    //     if (localStorage.getItem('access_token') !== null) {
    //        setIsAuth(true); 
    //      }
    //    }, [isAuth]);

    return (
        // <>
            
        //     {isAuth ? <MainPage /> : <LoginPage />}
        // </>
        // ROMA VERSION
        <div className="App">
            <MainPage />
        </div>
        // ROMA VERSION

        // <MainPage />
    );
}

export default App;
