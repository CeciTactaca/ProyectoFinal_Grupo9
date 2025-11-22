import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
        
function Game() {

    return(
        <Container>
        <h1>GAMES</h1>
        <Outlet />
        </Container>
    )
};

export default Game;