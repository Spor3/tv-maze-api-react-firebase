import { Navbar, Container, Nav } from "react-bootstrap"
import { BubblyLink } from 'react-bubbly-transitions';
import { Link } from "react-router-dom";

const MyNavbar = ({user}:any) => {

    const { displayName } = JSON.parse(user);

    return(
        <Navbar expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand className="animate-in" style={{animationDelay: "600ms"}}>{displayName}</Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="animate-in" style={{animationDelay: "800ms"}} id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><BubblyLink to='/' /* colorStart = "black" colorEnd = "blue" */>Search</BubblyLink></Nav.Link>
            <Nav.Link ><BubblyLink to='/favorites'>Favorites</BubblyLink></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default MyNavbar;