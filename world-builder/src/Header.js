import React from 'react';
import { Navbar, NavItem, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";




class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>Pinpoint</Navbar.Brand>

        <NavItem><Link to="/about" className="nav-link"><Button>About</Button></Link></NavItem>

        <NavItem><Link to="/" className="nav-link"><Button>Home</Button></Link></NavItem>

        <NavItem><Link to="/planet" className="nav-link"><Button>Pinpoint</Button></Link></NavItem>

      </Navbar>
                
    )
  }
}

export default Header;