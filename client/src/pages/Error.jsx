import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {

    return(
        <Container>
        <h1>Error al cargar la Pagina</h1>
        <h1> <Link to="/"> Volver al HOME </Link></h1>
        </Container>
    )
};

export default Error;