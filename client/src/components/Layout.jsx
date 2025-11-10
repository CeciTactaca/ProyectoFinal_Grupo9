import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion";
import "../assets/css/navBar.css"
import { Button } from "react-bootstrap";
import { useModo } from "../hooks/useModoOscuro.js"
import { FaAdjust } from "react-icons/fa";
import { FaSun, FaMoon } from 'react-icons/fa';

function Layout() {

    const { user, isAuthenticated, logout } = useAutorizacion();
    const { modo, toggleModo } = useModo();
    const navigate = useNavigate();

    const isLight = modo === 'light';

    const manejarLogout = () => {
        logout();
        navigate('/');
    };

    const irALogin = () => {
        navigate('/');
    };

    return (
    
            <div className="layout" bg={modo}>
                <header>
                    {/*Navbar superior*/}
                    <Navbar className={modo === 'dark' ? 'nav-oscuro' : 'nav-claro'} expand="lg">
                        <Container>
                            <Navbar.Brand as={Link} to="/">Grupo 09</Navbar.Brand>
                            <div>
                                <Button variant="warning" onClick={toggleModo}>
                                    {isLight ? <FaMoon style={{ color: 'rgb(27, 65, 255)' }} /> : <FaSun style={{ color: 'rgb(16, 20, 40)' }} />}
                                </Button>
                            </div>
                        </Container>
                    </Navbar>
                    {/*Navbar inferior*/}
                    <Navbar expand="lg" className={modo === 'dark' ? 'nav-oscuro' : 'nav-claro'}>
                        <Container>
                            <Navbar.Toggle aria-controls="main-navbar" className="toggler-unico" />
                            <Navbar.Collapse id="main-navbar">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/aboutus">AboutUs</Nav.Link>
                                    <NavDropdown title="Proyectos" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/proyecto2">Proyecto 2</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/proyecto3">Proyecto 3</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/proyecto4">Proyecto 4</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/proyecto5">Proyecto 5</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/Error">Pagina de error</NavDropdown.Item>
                                    </NavDropdown>

                                    {isAuthenticated && user?.rol === 'ALUMNO'
                                        && (<Nav.Link as={Link} to="/games">Game</Nav.Link>)}
                                </Nav>
                                {isAuthenticated ?
                                    (<Button variant="warning" onClick={manejarLogout}>Cerrar Sesion</Button>)
                                    : (<Button variant="warning" onClick={irALogin}>Iniciar Sesion</Button>)}
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>

                {/*En main se mostraran el resto de páginas*/}
                <main className={modo === 'light' ? 'modo-claro' : 'modo-oscuro'}>
                    <Outlet></Outlet>
                </main>
                {/*Pie de pagina*/}
                <footer className={`d-flex justify-content-center align-items-center nav ${modo === 'dark' ? 'nav-oscuro' : 'nav-claro'} px-3`} style={{ height: '80px' }} >
                    <p className="mb-0 text-center">Proyecto Final Fundamentos de Programacion Web 2025</p>
                </footer>
            </div>
        
    )
};
export default Layout;