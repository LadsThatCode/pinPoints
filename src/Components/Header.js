import React, { useState, useEffect } from 'react';
import { NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Profile from './Profile';
import './Header.css';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0(); // Add logout function
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='navbar-pinpoint'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              Pinpoint <i className='fab fa-typo3' />
            </Link>
          </div>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
          </div>
          <ul id='ul' className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li className='nav-item'>
                <NavItem>
                  <Link
                    to='/search'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Pinpoint Locations
                  </Link>
                </NavItem>
              </li>
            )}
            <li className='nav-item'>
              <NavItem>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </NavItem>
            </li>
            {!isAuthenticated && (
              <li className='nav-item'>
                <NavItem>
                  <Link
                    to='/log-in'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Log-In
                  </Link>
                </NavItem>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <Button
              buttonStyle='btn--outline'
              onClick={() => {
                logout({ returnTo: window.location.origin });
                closeMobileMenu();
              }}
            >
              Log Out
            </Button>
          ) : (
            !isAuthenticated &&
            button && (
              <Button
                buttonStyle='btn--outline'
                onClick={() => {
                  loginWithRedirect();
                  closeMobileMenu();
                }}
              >
                Log-In
              </Button>
            )
          )}
          <Profile />
        </div>
      </nav>
    </>
  );
}

export default Header;