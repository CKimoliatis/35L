import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import YooniLogo from "../objects/YooniLogoNavBar.png";
import UserIcon from "../objects/user.png";
import "../CSS/styles.css";

const NavigationBar = () => {
  return (
    <Navbar
      data-bs-theme="dark"
      fixed="top"
      expand="lg"
      style={{ backgroundColor: "#0098dc", color: "white" }}
      className="navbar-custom"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={YooniLogo} height={"100%"} alt="Yooni Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/inventory" className="nav-link-custom">
              Inventory
            </Nav.Link>
            <Nav.Link as={Link} to="/my-listings" className="nav-link-custom">
              My Listings
            </Nav.Link>
            <Nav.Link as={Link} to="/my-watchlist" className="nav-link-custom">
              {" "}
              My Watchlist
            </Nav.Link>
            <Nav.Link as={Link} to="/postItem" className="nav-link-custom">
              Post Item
            </Nav.Link>
            <NavDropdown
              title={
                <img
                  src={UserIcon}
                  width="30"
                  height="30"
                  className="rounded-circle"
                  alt="My Account"
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="/my-account"
                className="nav-link-custom"
              >
                My Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;