import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion";
import "../assets/css/navBar.css"
import { Button } from "react-bootstrap";

function Layout() {

    const { user, isAuthenticated, logout } = useAutorizacion();
    const navigate = useNavigate();

    const manejarLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <Navbar className="navBg" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>Grupo 9</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/aboutus">AboutUs</Nav.Link>
                            {isAuthenticated && user?.rol === 'ADMINISTRATIVO'
                            && (<Nav.Link href="/proyectos">Proyectos</Nav.Link>)}
                            <NavDropdown title="More" id="basic-nav-dropdown">
                                
                                    {isAuthenticated && user?.rol === 'ALUMNO'
                                    && (<NavDropdown.Item href="/games">Game</NavDropdown.Item>)}
                                <NavDropdown.Item href="/Error">Pagina de error</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            {isAuthenticated ?
                                (<Button variant="success" onClick={manejarLogout}>Cerrar Sesion</Button>)
                                : (<Nav.Link href="/">Iniciar Sesion</Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    )
};
export default Layout;