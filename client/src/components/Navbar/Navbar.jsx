import './navbar.css';

import { useState } from 'react';

import auth from '../../utils/auth';

import { loggedInContent } from './NavbarContent';

import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">
          DevSync
        </a>
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
              <li className="navbar-item">
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
              <a onClick={auth.logout} href="/logout" className="navbar-link">
                Login
              </a>
            </li>
            <li className="navbar-item">
              <a onClick={auth.logout} href="/signup" className="navbar-link">
                Sign up
              </a>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
