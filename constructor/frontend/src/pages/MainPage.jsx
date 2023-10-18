import React, { useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import Navbar from "../components/UI/Navbar/Navbar"
import AppRouter from "../components/AppRouter"
import LoginPage from "./LoginPage"
import Logo from "../components/Img/output.png"

function MainPage() {
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true)
    }
  }, [isAuth])

  return (
    <>
      {isAuth ? (
        <BrowserRouter>
          <div
            style={{ display: "flex", marginLeft: "100px", marginTop: "30px" }}
          >
            <img src={Logo} style={{ width: "100px", marginRight: "10px" }} />
            <div>
              <h2>КОНСТРУКТОР СКОРИНГА</h2>
              <h5>версия v1</h5>
            </div>
          </div>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </>

    // <BrowserRouter>
    //     <Navbar />
    //     <AppRouter />
    // </BrowserRouter>
  )
}

export default MainPage
