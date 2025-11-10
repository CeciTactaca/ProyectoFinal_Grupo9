import { Login } from "../components/Login";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";

function Home() {

  return (
    <>
      <Container className="py-4">
      <div className="d-flex justify-content-start align-items-start flex-column flex-md-row">
        <div className="text-center text-md-center mb-0 mb-md-0 d-flex flex-column align-items-center align-items-md-center">
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
        </div>
        <Login />
      </div>
    </Container>
    </>
  )
};

export default Home;