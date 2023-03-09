import './navbar.css';

import { useState } from 'react';

import auth from '../../utils/auth';

import { loggedInContent } from './NavbarContent';

import { Link } from 'react-router-dom';
//asdf
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          DevSync
        </Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      <ul className={`navbar-menu${menuOpen ? ' navbar-menu--open' : ''}`}>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        {auth.loggedIn() &&
          loggedInContent.map(({ route, name }) => {
            return (
              <li key={name} className="navbar-item">
                <Link className="navbar-link" to={route}>
                  {name}
                </Link>
              </li>
            );
          })}

        {auth.loggedIn() ? (
          <li className="navbar-item">
            <a onClick={auth.logout} className="navbar-link">
              Logout
            </a>
          </li>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
