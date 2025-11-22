import { Container } from "react-bootstrap";
import JuegoColores from "../components/JuegoColores.jsx";
import JuegoNumeros from "../components/JuegoNumeros.jsx";
        
function Game() {

    return(
        <Container>
        <h1>GAMES</h1>
        <JuegoColores />
        <JuegoNumeros />
        </Container>
    )
};

export default Game;