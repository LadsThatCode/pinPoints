import React from 'react';
import { Navbar, NavItem, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>Pinpoint</Navbar.Brand>

        <NavItem><Link to="/about" className="nav-link"><Button>About</Button></Link></NavItem>

        <NavItem><Link to="/" className="nav-link"><Button>Home</Button></Link></NavItem>

        <NavItem><Link to="/planet" className="nav-link"><Button>Pinpoint</Button></Link></NavItem>

        <NavItem>

        <TextField id="outlined-basic" label="Enter Location" variant="outlined" />
        <Button variant="contained">Contained</Button>

        </NavItem>
      </Navbar>
                
    )
  }
}

export default Header;