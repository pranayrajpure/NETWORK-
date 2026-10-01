import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment'; // <-- 1. Add import here
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays at the top of all pages */}
      <Navbar />

      {/* Routes define which component loads for which URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} /> {/* <-- 2. Add route here */}
      </Routes>

      {/* Footer stays at the bottom of all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;