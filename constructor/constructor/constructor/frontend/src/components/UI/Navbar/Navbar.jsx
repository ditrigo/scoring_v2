import React from 'react';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/upload' className="nav-link">Модуль загрузки данных</Link>
                        <Link to='/scoring' className="nav-link">Модуль скоррингой модели</Link>
                        <Link to='/pipeline' className="nav-link">Модуль пайплайна</Link>
                        <Link to='/crm' className="nav-link">Модуль CRM</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;