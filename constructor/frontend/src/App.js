import React from "react"
import MainPage from "./pages/MainPage"

import "../src/styles/App.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

function App() {
  // const [isAuth, setIsAuth] = useState(false)

  // useEffect(() => {
  //     if (localStorage.getItem('access_token') !== null) {
  //        setIsAuth(true);
  //      }
  //    }, [isAuth]);

  return (
    <div className="App">
      <MainPage />
    </div>
  )
}

export default App
