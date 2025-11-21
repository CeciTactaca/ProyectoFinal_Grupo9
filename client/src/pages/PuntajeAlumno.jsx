import { useAutorizacion } from "../hooks/useAutorizacion";
import { Container } from "react-bootstrap";


function PuntajeFinal() {

    const { userNombre, userPuntajes, userTotal } = useAutorizacion();
    console.log(userNombre);
    console.log(userPuntajes);

    //De acuerdo al puntaje es el nivel de ingles
    const nivelIngles = (total) => {
        if (total <= 10){
            return "Nivel Inicial";
        } else if (total <= 20) {
            return "Nivel Intermedio";
        } else {
            return "Nivel Superior";
        }
    }

    return (
        <Container className="text-center mt-5">
            <h1>Puntaje Final de {userNombre}</h1>
            <p>Colores: {userPuntajes?.colores}</p>
            <p>Animales: {userPuntajes?.animales}</p>
            <p>Números: {userPuntajes?.numeros}</p>
            <p>Verbos: {userPuntajes?.verbos}</p>
            <h5>Puntaje Total: {userTotal}</h5>
            <h3>{nivelIngles(userTotal)}</h3>
        </Container>
    )
};

export default PuntajeFinal;