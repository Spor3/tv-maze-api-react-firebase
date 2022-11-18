import { Navbar, Container, Nav } from "react-bootstrap"
import { BubblyLink } from 'react-bubbly-transitions';
import { Search, HeartFill, PersonCircle, PersonDashFill } from 'react-bootstrap-icons';
import { logOut } from "../../_service/firebase/firebaseAuth.service";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Theme from "../../features/theme/Theme";
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../features/theme/themeSlice';

const MyNavbar = ({user, activeLink}:any) => {

    const { displayName } = JSON.parse(user);
    const theme = useAppSelector(selectTheme);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogOut = () => {
      logOut()
        .then(() => {navigate('/login')})
          .catch((err) => {
            setError(err)
          })
    }

    return(
        <Navbar expand="lg" sticky="top">
        <Container fluid>
        <Navbar.Brand className="animate-in d-flex align-items-center" style={{animationDelay: "600ms"}}><PersonCircle /> {displayName}</Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="animate-in" style={{animationDelay: "800ms"}} id="basic-navbar-nav">
          <Nav>
            <Nav.Link className={activeLink === 'search'?'active':''}><BubblyLink to='/'colorStart="#bdbb49" colorEnd={theme === 'dark'?'#110f16':'#f3f5f7'} ><div className="d-flex align-items-center nav-link-font"><Search /><>Search</></div></BubblyLink></Nav.Link>
            <Nav.Link className={activeLink === 'favorite'?'active':''}><BubblyLink to='/favorites' colorStart = "#bdbb49" colorEnd={theme === 'dark'?'#110f16':'#f3f5f7'} ><div className="d-flex align-items-center nav-link-font"><HeartFill /><>Favorite</></div></BubblyLink></Nav.Link>
            <Nav.Link onClick={handleLogOut}><div style={{padding: '1px 6px'}}><div className="d-flex align-items-center nav-link-font"><PersonDashFill /><>Log Out</></div></div></Nav.Link>
             <Nav.Item className="d-flex align-items-center ms-auto"> <Theme /> </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default MyNavbar;