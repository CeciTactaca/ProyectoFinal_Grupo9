import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {

    return (
        <Container fluid className="d-flex alig-items-center justify-content-center" >
            <Row className="text-center mt-5">
                <Col>
                    <h1>Error al encontrar la Pagina</h1>
                    <Button variant="outline-primary" href="/">
                        Volver al inicio
                    </Button>
                </Col>
            </Row>
        </Container>
    )
};

export default Error;