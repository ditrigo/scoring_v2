import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        style={{ backgroundPosition: "50% 0" }}
      >
        <div className="container">
          <div className="collapse navbar-collapse m-0" id="navbarNavAltMarkup">
            {/* <ul className="navbar-nav w-75 m-auto"> */}
            <ul className="navbar-nav m-0">
              <li className="nav-item active">
                <Link to="/upload" className="navbar-brand ml-5 mb-2">
                  Модуль загрузки данных
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/scoring" className="navbar-brand ml-5 mb-2">
                  Модуль скорингой модели
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pipeline" className="navbar-brand ml-5 mb-2">
                  Модуль выдачи результатов
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/crm" className="navbar-brand ml-5 mb-2">
                  Модуль CRM
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="navbar-brand ml-5 mb-2">
                  Выйти
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
