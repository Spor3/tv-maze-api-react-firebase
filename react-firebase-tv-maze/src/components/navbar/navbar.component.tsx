import { Navbar, Container, Nav } from "react-bootstrap"
import { BubblyLink } from 'react-bubbly-transitions';
import { Search, HeartFill, PersonCircle, PersonDashFill, XCircle, EyeFill } from 'react-bootstrap-icons';
import { logOut } from "../../_service/firebase/firebaseAuth.service";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Theme from "../../features/theme/Theme";
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../features/theme/themeSlice';
import DropDownMenu from '../dropDown/dropDownColor.component';
import { selectSecondaryColor } from "../../features/secondaryColor/secondaryColor";
import { UserContext } from "../../hooks/context/UserContext";

const MyNavbar = ({activeLink}:any) => {

    const {user, isLoading, error}:any = useContext(UserContext);
    const theme = useAppSelector(selectTheme);
    const ReduxSecondaryColor = useAppSelector(selectSecondaryColor)
    const [ errors, setError] = useState<string>('');
    const navigate = useNavigate();
    const [ modal, setModal ] = useState<boolean>(false);

    useEffect(() => {
      if(modal) {
        document.body.className = "open";
        document.body.style.overflowY = "hidden";
      } else {
        document.body.className = "close";
        document.body.style.overflowY = "auto";
      }
    }, [modal])



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
        <Navbar.Brand className="animate-in d-flex align-items-center" style={{animationDelay: "600ms"}}><PersonCircle className="me-1" /> {user.displayName}</Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="animate-in" style={{animationDelay: "800ms"}} id="basic-navbar-nav">
          <Nav>
            <Nav.Link className={activeLink === 'search'?'active':''}><BubblyLink to='/'colorStart={`${ReduxSecondaryColor === 'yellow'?'#bdbb49': ReduxSecondaryColor === 'green'?'#79dd09':ReduxSecondaryColor === 'blue'?'#0076bd':'#bd150b'}`} colorEnd={theme === 'dark'?'#110f16':'#f3f5f7'} ><div className="d-flex align-items-center nav-link-font"><Search /><>Search</></div></BubblyLink></Nav.Link>
            <Nav.Link className={activeLink === 'favorite'?'active':''}><BubblyLink to='/favorites' colorStart={`${ReduxSecondaryColor === 'yellow'?'#bdbb49': ReduxSecondaryColor === 'green'?'#79dd09':ReduxSecondaryColor === 'blue'?'#0076bd':'#bd150b'}`} colorEnd={theme === 'dark'?'#110f16':'#f3f5f7'} ><div className="d-flex align-items-center nav-link-font"><HeartFill /><>Favorite</></div></BubblyLink></Nav.Link>
            <Nav.Link className={activeLink === 'watching'?'active':''}><BubblyLink to='/watching' colorStart={`${ReduxSecondaryColor === 'yellow'?'#bdbb49': ReduxSecondaryColor === 'green'?'#79dd09':ReduxSecondaryColor === 'blue'?'#0076bd':'#bd150b'}`} colorEnd={theme === 'dark'?'#110f16':'#f3f5f7'} ><div className="d-flex align-items-center nav-link-font"><EyeFill /><>Watching</></div></BubblyLink></Nav.Link>
            <Nav.Link onClick={() => setModal(!modal)}><div style={{padding: '1px 6px'}}><div className="d-flex align-items-center nav-link-font"><PersonDashFill /><>Log Out</></div></div></Nav.Link>
            <Nav.Item className="d-flex align-items-center ms-auto"> <DropDownMenu /> </Nav.Item>
             <Nav.Item className="d-flex align-items-center"> <Theme /> </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="modal-background"></div>
    <div className="modal">
      <h2>Are You Sure?</h2>
      <p className="my-4">
      Without user you can not navigate on this site and if you change user will change your favorites.
      </p>
      <button className="search-button rounded" onClick={handleLogOut}>Log Out</button>
      <XCircle className="cursor" onClick={() => setModal(!modal)} />
    </div>
    </Navbar>
    )
}

export default MyNavbar;