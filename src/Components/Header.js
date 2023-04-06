import React, {useState, useEffect} from 'react';
import { Navbar, NavItem, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Profile from "./Profile";
import './Header.css';

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960){
      setButton(false);
    }else{
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
          Pinpoint <i className='fab fa-typo3'/>
        </Link>
        </div>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fa fa-times' : 'fa fa-bars'}/>
        </div>
        <ul className={click ? 'nav-menu active': 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/home' className='nav-links' onClick= 
            {closeMobileMenu}>
              Home
              </Link>
          </li>
          <li className='nav-item'>
            <NavItem><Link to='/search' className='nav-links' onClick= 
            {closeMobileMenu}>
              Pinpoint
              </Link></NavItem>
          </li>
          <li className='nav-item'>
            <NavItem><Link to='/about' className='nav-links' onClick= 
            {closeMobileMenu}>
              About
              </Link></NavItem>
          </li>
          <li className='nav-login'>
          <NavItem><Link to='/log-in' className='nav-links-mobile' onClick= 
            {closeMobileMenu}>
              Log-In
              </Link></NavItem>
          </li>
        </ul>
        {button && <Button buttonStyle='btn--outline'>Log-In</Button>}
        <Profile/>
      </div>
    </nav>
    </>
  )
}


// class Header extends React.Component {
//   render() {
//     return (
//       <Navbar id='navBar' collapseOnSelect expand="lg" bg="light" variant="light">
//         <Navbar.Brand><Link to="/" className="nav-link"><Button>Pinpoint</Button></Link></Navbar.Brand>

//         <NavItem><Link to="/about" className="nav-link"><Button>About</Button></Link></NavItem>

//         <NavItem><Link to="/home" className="nav-link"><Button>Home</Button></Link></NavItem>

//         <NavItem><Link to="/search" className="nav-link"><Button>Pins</Button></Link></NavItem>

//         <Profile />
//       </Navbar>
                
//     )
//   }
// }

export default Header;