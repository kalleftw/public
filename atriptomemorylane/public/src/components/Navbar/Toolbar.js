import React, {useState} from "react";
import logo from "../.././assets/logo/logo.png";
import "./Toolbar.css";
import Dropdown from './CountryDropdown'

import firebase from "../../config"



import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import BreadCrumb from "../Breadcrumb";

/**
 * Main navigation bar
 */
const MainNav = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  firebase.auth().onAuthStateChanged(function (user) {
    setIsLoggedIn(!!user);
  });

  return (
    <Navbar
      className="navbar-inner"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Navbar.Brand>
        <a href="/" className="navbar-inner">
          <img src={logo} />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Memories">Memories</Nav.Link>
          <Nav.Link href="/CreateNewMemories">Create new memories</Nav.Link>
          {isLoggedin ? (<Nav.Link href="/Login">Logged in</Nav.Link>) : (<Nav.Link href="/Login">Log in</Nav.Link>)}

          <Nav.Link href="/About">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <BreadCrumb/>
      <Dropdown/>
    </Navbar>
  );
};

export default MainNav;
