import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav p-1">
            <Link to="/upload" className="nav-link m-2">
              Модуль загрузки данных
            </Link>
            <Link to="/scoring" className="nav-link m-2">
              Модуль скорингой модели
            </Link>
            <Link to="/pipeline" className="nav-link m-2 ">
              Модуль выдачи результатов
            </Link>
            <Link to="/crm" className="nav-link m-2">
              Модуль CRM
            </Link>
            <Link to="/logout" className="nav-link m-2">
              Выйти
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
