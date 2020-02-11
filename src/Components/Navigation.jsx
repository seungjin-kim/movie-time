import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

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
          fontSize: "35px"
        }}>Movie Time</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              {props.sessionId ? (
                <div></div>
              ) : (
                <NavLink href="JavaScript:Void(0)" onClick={(e) => props.handleLogin(e)}>Login</NavLink>
              )}
            </NavItem>
            <NavItem>
              {props.sessionId ? (
                <NavLink href="#" onClick={(e) => props.handleLogout(e)}>Logout</NavLink>
              ) : (
                <div></div>
              )}
            </NavItem>
            <NavItem>
              {props.watchListClicked ? (
                <div></div>
              ) : (
                <NavLink href="JavaScript:Void(0)" onClick={(e) => props.getWatchListMovies(e)}> Watchlist </NavLink>
              )}
            </NavItem>
            <NavItem>
              {props.watchListClicked ? (
                    <NavLink href="/">Home</NavLink>
                  ) : (
                    <div></div>
                  )}
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

export default Navigation;