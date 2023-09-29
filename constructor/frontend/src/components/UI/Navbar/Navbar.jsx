import React from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <ul className="navbar-nav p-1">
                        <Link to='/upload' className="nav-link m-2">Модуль загрузки данных</Link>
                        <Link to='/scoring' className="nav-link m-2">Модуль скоррингой модели</Link>
                        <Link to='/pipeline' className="nav-link m-2">Модуль пайплайна</Link>
                        <Link to='/crm' className="nav-link m-2">Модуль CRM</Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
