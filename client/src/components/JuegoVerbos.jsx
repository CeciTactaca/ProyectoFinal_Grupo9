import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePuntaje } from "../hooks/usePuntaje";
//imagenes que se mostraran
import doctor from "../assets/img/JuegoVerbos/doctor.png";
import bailarina from "../assets/img/JuegoVerbos/bailarina.png";
import ninios from "../assets/img/JuegoVerbos/ninios.png";
import globos from "../assets/img/JuegoVerbos/globos.jpg";
import gato from "../assets/img/JuegoVerbos/gato.png";
import soleado from "../assets/img/JuegoVerbos/soleado.png";

function JuegoVerbos() {

    //Para guardar el puntaje del juego y el total
    const { actualizarPuntaje, guardarPuntaje } = usePuntaje();

    const navigate = useNavigate();

    //Oraciones que van a ir cambiando
    const oraciones = [
        { oracion: "He ..... a doctor.", correcta: "is", img: doctor },
        { oracion: "She ..... a teacher.", correcta: "is not", img: bailarina },
        { oracion: "They ..... a happy.", correcta: "are", img: ninios },
        { oracion: "They ..... a pink ballons.", correcta: "are not", img: globos },
        { oracion: "It ..... a cat.", correcta: "is", img: gato },
        { oracion: "It ..... raining.", correcta: "is not", img: soleado }
    ];

    //Verbos son los botones con las opciones a elegir
    const verbos = ["is", "is not", "are", "are not"];

    const [indice, setIndice] = useState(0); //Indice de los objetos del array oraciones
    const oracionActual = oraciones[indice]; //Empieza con la primera oracion
    const [puntos, setPuntos] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [tiempo, setTiempo] = useState(30);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    //Efecto del temporizador total de 30 seg
    useEffect(() => {
        if (juegoTerminado) return;
        if (tiempo <= 0) {
            setJuegoTerminado(true);
            setMensaje("¡Tiempo terminado!");
            actualizarPuntaje("verbos", puntos);
            return;
        }

        const intervalo = setInterval(() => {
            setTiempo((t) => t - 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [tiempo, juegoTerminado]);

    //Para que vaya cambiando de oracion
    const cambiarOracion = () => {
        if (indice < oraciones.length - 1) {
            setIndice(indice + 1);
        }
    };

    //Cambio de oracion cada 5 seg
    useEffect(() => {
        if (juegoTerminado) return;
        const cambio = setInterval(() => {
            cambiarOracion();
        }, 5000);
        return () => clearInterval(cambio);
    }, [indice, juegoTerminado]);

    //Controla que hacen los botones
    const handleClick = (opcion) => {
        if (juegoTerminado) return; // no permite seguir jugando

        if (opcion === oracionActual.correcta) {
            const nuevosPuntos = puntos + 1;
            setPuntos(nuevosPuntos);
            setMensaje("✅ ¡Correcto!");
            if (indice === oraciones.length - 1) {
                setJuegoTerminado(true);
                setMensaje("Juego terminado");
                actualizarPuntaje("verbos", nuevosPuntos);
            } else {
                cambiarOracion();
            }
        } else {
            setMensaje("❌ Incorrecto, intenta de nuevo");
        }

    };

    const reiniciarJuego = () => {
        setPuntos(0);
        setTiempo(30);
        setMensaje("");
        setJuegoTerminado(false);
        setIndice(0);
    };

    //Se pasa a ver el puntaje final y guarda los nuevos puntajes
    const irPuntaje = () => {
        guardarPuntaje();
        navigate("/puntaje");
    }


    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center">
            <Row className="mt-3">
                <h1>Elige la forma correcta del verbo To Be</h1>
                <p style={{ fontSize: "1.2rem" }}>Puntos: {puntos}   Tiempo restante: <strong>{tiempo}s</strong></p>
                <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>{mensaje}</p>
            </Row>
            {oracionActual && (
                <Row>
                    <Col>
                        <h2 style={{ marginTop: "30px", fontSize: "2rem" }}>
                            {oracionActual.oracion}
                        </h2>
                    </Col>
                    <Col>
                        <img
                            src={oracionActual.img}
                            alt="img"
                            style={{ maxWidth: "150px", height: "auto" }}
                            className="mx-auto d-block"
                        />
                    </Col>
                </Row>
            )}

            <Row className="justify-content-center mt-4">
                {verbos.map((verbo) => (
                    <Col xs="auto" key={verbo}>
                        <Button
                            onClick={() => handleClick(verbo)}
                            variant="warning"
                            size="lg"
                            style={{
                                cursor: juegoTerminado ? "not-allowed" : "pointer",
                                opacity: juegoTerminado ? 0.5 : 1,
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                                !juegoTerminado &&
                                (e.currentTarget.style.transform = "scale(1.1)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                        >
                            {verbo}
                        </Button>
                    </Col>
                ))}
            </Row>
            {juegoTerminado && (
                <Row className="mb-2">
                    <Button onClick={reiniciarJuego} variant="warning" className="mt-3" size="lg">
                        Reiniciar
                    </Button>
                    <Button onClick={irPuntaje} variant="warning" className="mt-3" size="lg">
                        Terminar
                    </Button>
                </Row>
            )}
        </Container>
    )
}

export default JuegoVerbos;
