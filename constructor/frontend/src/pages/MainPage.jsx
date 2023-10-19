import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/UI/Navbar/Navbar";
import AppRouter from "../components/AppRouter";
import LoginPage from "./LoginPage";
import Logo from "../components/Img/output.png";

function MainPage() {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      {isAuth ? (
        <BrowserRouter>
          <div
            className="container"
            style={{
              display: "flex",
              marginLeft: "180px",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            <img 
              src={Logo} 
              style={{ width: "100px", marginRight: "10px" }} 
            />
            <div
              style={{ display: "flex", marginLeft: "10px", marginTop: "30px" }}
            >
              <h2>КОНСТРУКТОР СКОРИНГА</h2>
              <p>build_v1_1</p>
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
  );
}

export default MainPage;
