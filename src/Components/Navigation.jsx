import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <img width="60" src="/moviedb-logo.png"></img>
        <NavbarBrand href="/" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Source Sans Pro', Arial, sans-serif",
          fontWeight: "900",
        }}>Movie Time</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="JavaScript:Void(0)" onClick={(e) => this.handleLogin(e)}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;