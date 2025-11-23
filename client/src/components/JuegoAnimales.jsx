import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePuntaje } from "../hooks/usePuntaje";

function JuegoAnimales() {

    //Para guardar el puntaje del juego y el total
    const { actualizarPuntaje } = usePuntaje();

    const navigate = useNavigate();

    //Oraciones que van a ir cambiando
    const animales = [
        { nombre: "Dog", animal: "🐕" },
        { nombre: "Cat", animal: "🐈" },
        { nombre: "Penguin", animal: "🐧" },
        { nombre: "Giraffe", animal: "🦒" },
        { nombre: "Octopus", animal: "🐙" },
        { nombre: "Cow", animal: "🐄" },
        { nombre: "Lion", animal: "🦁", },
    ];

    const [animalActual, setAnimalActual] = useState(); //emoji que se muestra
    const [nombreActual, setNombreActual] = useState(); //nombre que aparece
    const [puntos, setPuntos] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [tiempo, setTiempo] = useState(20);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    //Generar nueva ronda de animales
    const nuevaRonda = () => {
        const animalRandom = animales[Math.floor(Math.random() * animales.length)];

        let nombreRandom;
        do {
            nombreRandom = animales[Math.floor(Math.random() * animales.length)].nombre;
        } while (nombreRandom === nombreActual);

        setAnimalActual(animalRandom);
        setNombreActual(nombreRandom);

    };

    useEffect(() => {
        nuevaRonda();
    }, []);

    //Efecto del temporizador total de 30 seg
    useEffect(() => {
        if (juegoTerminado) return;
        if (tiempo <= 0) {
            setJuegoTerminado(true);
            setMensaje("¡Tiempo terminado!");
            actualizarPuntaje("animales", puntos);
            return;
        }

        const intervalo = setInterval(() => {
            setTiempo((t) => t - 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [tiempo, juegoTerminado]);


    //Controla que hacen los botones
    const handleClick = (opcion) => {
        if (juegoTerminado) return; // no permite seguir jugando

        const esCorrecto = animalActual.nombre === nombreActual;

        if ((esCorrecto && opcion === "correcto") || (!esCorrecto && opcion === "incorrecto")) {
            const nuevosPuntos = puntos + 1;
            setPuntos(nuevosPuntos);
            setMensaje("✅ ¡Correcto!");
        } else {
            setMensaje("❌ Incorrecto, intenta de nuevo");
        }

        //Leve pausa antes de cambiar
        setTimeout(() => {
            nuevaRonda();
        }, 100);

    };

    const reiniciarJuego = () => {
        setPuntos(0);
        setTiempo(20);
        setMensaje("");
        setJuegoTerminado(false);
    };

    //Se pasa a ver el puntaje final y guarda los nuevos puntajes
    const irNumeros = () => {
        navigate("/games/numeros");
    }


    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center">
            <Row className="mt-3">
                <h1>Juego de animales</h1>
                <p style={{ marginTop: "5px", fontSize: "1.2rem" }}>¿El nombre corresponde con el dibujo?</p>
                <p style={{ fontSize: "1.2rem" }}>🏆 Puntos: {puntos}      ⏱ Tiempo restante: <strong>{tiempo}s</strong></p>
                <p style={{ fontSize: "1.2rem" }}>{mensaje}</p>
            </Row>
            <Row
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "20px",
                    borderRadius: "8px"
                }}
            >
                <Col><p style={{ fontSize: "4rem" }}>{animalActual?.animal}</p></Col>
                <Col className="d-flex justify-content-center align-items-center"><h2>{nombreActual}</h2></Col>
            </Row>

            <Row className="justify-content-center mt-4">
                <div>
                    <Button
                        onClick={() => handleClick("correcto")}
                        variant="success"
                        size="lg"
                        style={{
                            marginRight: "5px",
                            padding: "10px 20px",
                            fontSize: "1.2rem",
                            cursor: juegoTerminado ? "not-allowed" : "pointer",
                            opacity: juegoTerminado ? 0.5 : 1,
                            transition: "transform 0.2s ease"
                        }}
                        onMouseEnter={(e) =>
                            !juegoTerminado &&
                            (e.currentTarget.style.transform = "scale(1.1)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        Correcto
                    </Button>
                    <Button
                        onClick={() => handleClick("incorrecto")}
                        variant="danger"
                        size="lg"
                        style={{
                            marginLeft: "5px",
                            padding: "10px 20px",
                            fontSize: "1.2rem",
                            cursor: juegoTerminado ? "not-allowed" : "pointer",
                            opacity: juegoTerminado ? 0.5 : 1,
                            transition: "transform 0.2s ease"
                        }}
                        onMouseEnter={(e) =>
                            !juegoTerminado &&
                            (e.currentTarget.style.transform = "scale(1.1)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        Incorrecto
                    </Button>
                </div>
            </Row>
            {juegoTerminado && (
                <div>
                    <Button
                        onClick={reiniciarJuego}
                        variant="warning"
                        size="lg"
                        style={{
                            marginTop: "20px",
                            marginBottom: "10px",
                            marginRight: "5px",
                            padding: "10px 20px",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                        }}
                    >
                        Reiniciar
                    </Button>
                    <Button
                        onClick={irNumeros}
                        variant="warning"
                        size="lg"
                        style={{
                            marginTop: "20px",
                            marginBottom: "10px",
                            marginLeft: "5px",
                            padding: "10px 20px",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                        }}
                    >
                        Siguiente
                    </Button>
                </div>
            )}
        </Container>
    )
}

export default JuegoAnimales;
