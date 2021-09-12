import React from 'react';
import { Navbar, Nav, Container,NavDropdown} from "react-bootstrap";

function NavBar() {
  let userData = localStorage.getItem("user")
  let isUserLoggedIn = false;
  if(userData != null)
  {
    userData = JSON.parse(userData)
    isUserLoggedIn = true;
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Twitter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/tweet">Tweet</Nav.Link>
            <Nav.Link href="/feed">feed</Nav.Link>
          </Nav>
          <NavDropdown title="Account" id="basic-nav-dropdown" >
          {!isUserLoggedIn ? (
            <NavDropdown.Item href="/login">Login/SignUp</NavDropdown.Item>
          ) : (
            <div>
              <NavDropdown.Item href="#">{userData['identifier']}</NavDropdown.Item>
              <NavDropdown.Item href="/your-tweets">Your Tweets</NavDropdown.Item>
              <NavDropdown.Item href="/logout">logout</NavDropdown.Item>
            </div>
          )}
        </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

