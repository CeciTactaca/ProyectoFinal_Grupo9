import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion";
import "../assets/css/navBar.css"
import { Button } from "react-bootstrap";
import { FaAdjust } from "react-icons/fa";

function Layout() {

    const { user, isAuthenticated, logout } = useAutorizacion();
    const navigate = useNavigate();

    const manejarLogout = () => {
        logout();
        navigate('/');
    };

    const irALogin = () => {
        navigate('/');
    };

    return (
        <div className="layout">
            <header>
                {/*Navbar superior*/}
                <Navbar className="navBg py-2" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Grupo 09</Navbar.Brand>
                        <div>
                            <Button variant="warning"><FaAdjust /></Button>
                        </div>
                    </Container>
                </Navbar>
                {/*Navbar inferior*/}
                <Navbar className="navBg" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="main-navbar" />
                        <Navbar.Collapse id="main-navbar">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/aboutus">AboutUs</Nav.Link>
                                <NavDropdown title="Proyectos" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/proyecto2">Proyecto 2</NavDropdown.Item>
                                    <NavDropdown.Item href="/proyecto3">Proyecto 3</NavDropdown.Item>
                                    <NavDropdown.Item href="/proyecto4">Proyecto 4</NavDropdown.Item>
                                    <NavDropdown.Item href="/proyecto5">Proyecto 5</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/Error">Pagina de error</NavDropdown.Item>
                                </NavDropdown>

                                {isAuthenticated && user?.rol === 'ALUMNO'
                                    && (<Nav.Link href="/games">Game</Nav.Link>)}
                            </Nav>
                            {isAuthenticated ?
                                (<Button variant="warning" onClick={manejarLogout}>Cerrar Sesion</Button>)
                                : (<Button variant="warning" onClick={irALogin}>Iniciar Sesion</Button>)}
                        </Navbar.Collapse> 
                    </Container>
                </Navbar>
            </header>

            {/*En main se mostraran el resto de páginas*/}
            <main>
                <Outlet></Outlet>
            </main>
            {/*Pie de pagina*/}
            <footer className="bg-primary text-light text-center py-3">
                <p>Proyecto Final Fundamentos de Programacion Web 2025</p>
            </footer>
        </div>
    )
};
export default Layout;