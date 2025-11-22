import { Container } from "react-bootstrap";
import JuegoColores from "../components/JuegoColores.jsx";
import JuegoAnimales from "../components/JuegoAnimales.jsx";
        
function Game() {

    return(
        <Container>
        <h1>GAMES</h1>
        <JuegoColores />
        <JuegoAnimales />
        </Container>
    )
};

export default Game;