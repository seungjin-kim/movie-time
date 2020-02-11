import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationSecondary = (props) => {
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
          fontSize: "35px"
        }}>Movie Time</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/" onClick={(e) => props.getWatchListMovies(e)}>Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="JavaScript:Void(0)" onClick={(e) => props.handleLogout(e)}>Logout</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="">GitHub</NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationSecondary;