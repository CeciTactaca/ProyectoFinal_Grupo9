import { Login } from "../components/Login";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import { useAutorizacion } from "../hooks/useAutorizacion";

function Home() {
  const { isAuthenticated } = useAutorizacion();


  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100%", maxWidth: "650px", height: "auto" }}
            className="mx-auto mx-md-0 mb-2"
          />
          <p className="text-muted fs-5 m-0">
            Bienvenido a <strong>Nuestra Pagina</strong> , navega seguramente y descubre nuestros
            proyectos.
          </p>
        </Col>
        {!isAuthenticated
          && (
            <Col>
              <Login />
            </Col>)}
      </Row>
    </Container>
  )
};

export default Home;