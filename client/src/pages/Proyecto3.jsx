import { Col, Container, Row } from "react-bootstrap";
import Ejercicio1 from "../components/Proyecto3/ejercicio1.jsx";
import FormMascotas from "../components/Proyecto3/FormMascotas.jsx";

function Proyecto3() {

    return (
        <Container className="mb-5">
            <Col>
            <Row><Ejercicio1 /></Row>
            <Row><FormMascotas /></Row>
            </Col>
        </Container>

    )
};

export default Proyecto3;