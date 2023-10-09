import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Link, Navigate, Route, Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
