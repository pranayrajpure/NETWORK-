import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2>NETCONNECT <span>ISP</span></h2>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="/#features">Features</a></li>
        <li><a href="/#plans">Plans</a></li>
        <li><Link to="/login" className="nav-btn btn-login">Login</Link></li>
        <li><Link to="/register" className="nav-btn btn-register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;