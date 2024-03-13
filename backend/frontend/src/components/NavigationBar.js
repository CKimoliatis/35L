import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import YooniLogo from "../objects/YooniLogoNavBar.png";
import UserIcon from "../objects/user.png";
import "../CSS/styles.css";
import SearchBar from "./SearchBar/SearchBar";
import axios from "axios";

const NavigationBar = ({ updateSearchQuery, showSearch }) => {
  const navigate = useNavigate();
  const [schoolImage, setSchoolImage] = useState(null);
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object
  var userData_id = userData.id.toString();

  const handleSearchQueryChange = (query) => {
    updateSearchQuery(query); // Call updateSearchQuery function from props
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-schools");
        const schools = response.data;
        if (userData && schools) {
          const userSchool = schools.find(
            (school) => school.school_name === userData.school
          );
          if (userSchool && userSchool.school_image) {
            setSchoolImage(userSchool.school_image);
          }
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    console.log("Logged out" + userData);
    navigate("/"); //need to change this later on
  };

  return (
    <Navbar
      data-bs-theme="dark"
      fixed="top"
      expand="lg"
      style={{ backgroundColor: "#0098dc", color: "white" }}
      className="navbar-custom"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/landing">
          <img
            src={YooniLogo}
            height={"100%"}
            alt="Yooni Logo"
            style={{ marginRight: "0px" }}
          />{" "}
        </Navbar.Brand>
        {schoolImage && (
          <img
            src={schoolImage}
            height={"50px"}
            alt="School Logo"
            style={{ marginRight: "0px" }}
          />
        )}
        {showSearch ? (
          <SearchBar handleSearchQueryChange={handleSearchQueryChange} />
        ) : null}{" "}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/landing" className="nav-link-custom">
              Browse
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
            <Nav.Link as={Link} to="/chat" className="nav-link-custom">
              Chat
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
              style={{paddingRight: '100px'}}
            >
              <NavDropdown.Item
                as={Link}
                to="/my-account"
                className="nav-link-custom"
                
              >
                My Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
