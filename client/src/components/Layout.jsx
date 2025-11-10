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
                            <Nav.Link href="/registrar">Registrar</Nav.Link>
                            {isAuthenticated && user?.rol === 'ADMINISTRATIVO'
                                && (
                                    <NavDropdown title="Proyectos" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/proyecto2">Proyecto 2</NavDropdown.Item>
                                        <NavDropdown.Item href="/proyecto3">Proyecto 3</NavDropdown.Item>
                                        <NavDropdown.Item href="/proyecto4">Proyecto 4</NavDropdown.Item>
                                        <NavDropdown.Item href="/proyecto5">Proyecto 5</NavDropdown.Item>
                                    </NavDropdown>
                                )}
                            <NavDropdown title="More" id="basic-nav-dropdown">

                                {isAuthenticated && user?.rol === 'ALUMNO'
                                    && (<NavDropdown.Item href="/games">Game</NavDropdown.Item>)}
                                <NavDropdown.Item href="/Error">Pagina de error</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            {isAuthenticated ?
                                (<Button variant="warning" onClick={manejarLogout}>Cerrar Sesion</Button>)
                                : (<Nav.Link href="/">Iniciar Sesion</Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/*En main se mostraran el resto de páginas*/}
            <section>
                <Outlet></Outlet>
            </section>
            {/*Pie de pagina*/}
            <footer className="bg-light text-dark text-center py-3">
                <p>Proyecto Final Fundamentos de Programacion Web 2025</p>
            </footer>
        </>
    )
};
export default Layout;