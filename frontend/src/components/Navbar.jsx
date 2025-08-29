import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo">CPoint</Link>
        
        <nav className="nav-buttons">
          {user ? (
            <>
              <span className="user-greeting">
                Welcome, {user.firstName}
              </span>
              <Link to="/dashboard" className="btn">Dashboard</Link>
              <Link to="/profile" className="btn">Profile</Link>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;