import { Container } from "react-bootstrap";
import JuegoColores from "../components/JuegoColores.jsx";
import JuegoVerbos from "../components/JuegoVerbos.jsx";
        
function Game() {

    return(
        <Container>
        <h1>GAMES</h1>
        <JuegoColores />
        <JuegoVerbos />
        </Container>
    )
};

export default Game;