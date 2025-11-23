import { useAutorizacion } from "../hooks/useAutorizacion";
import { Container } from "react-bootstrap";


function PuntajeFinal() {

    const { userNombre, userPuntajes, userTotal } = useAutorizacion();
    
    console.log(userTotal);

    //De acuerdo al puntaje es el nivel de ingles
    const nivelIngles = (total) => {
        if (total <= 10) {
            return "Principiante";
        } else if (total <= 20) {
            return "Inicial";
        } else if (total <= 30) {
            return "Intermedio";
        } else {
            return "Avanzado";
        }
    }

    return (
        <Container className="text-center mt-5">
            <h1>Puntaje Final de {userNombre}</h1>
            <p>Juego Colores: {userPuntajes?.colores}</p>
            <p>Juego Animales: {userPuntajes?.animales}</p>
            <p>Juego Números: {userPuntajes?.numeros}</p>
            <p>Juego Verbos: {userPuntajes?.verbos}</p>
            <p>Juego Cuerpo Humano: {userPuntajes?.cuerpoHumano}</p>
            <h5>Puntaje Total: {userTotal}</h5>
            <h3>Tu nivel de ingles es : {nivelIngles(userTotal)}</h3>
        </Container>
    )
};

export default PuntajeFinal;