import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePuntaje } from "../hooks/usePuntaje";
//Audios que se usaran
import tres from "../assets/sounds/JuegoNumeros/tres.wav";
import siete from "../assets/sounds/JuegoNumeros/siete.wav";
import doce from "../assets/sounds/JuegoNumeros/doce.wav";
import diecinueve from "../assets/sounds/JuegoNumeros/diecinueve.wav";
import veintiuno from "../assets/sounds/JuegoNumeros/veintiuno.wav";
import veinticinco from "../assets/sounds/JuegoNumeros/veinticinco.wav";

function JuegoNumeros() {

    //Para guardar el puntaje del juego y el total
    const { actualizarPuntaje, guardarPuntaje } = usePuntaje();

    const navigate = useNavigate();

    //Numeros que van a ir cambiando
    const sonidos = [
        { sonido: tres, correcta: 3 },
        { sonido: siete, correcta: 7 },
        { sonido: doce, correcta: 12 },
        { sonido: diecinueve, correcta: 19 },
        { sonido: veintiuno, correcta: 21 },
        { sonido: veinticinco, correcta: 25 }
    ];

    const ejecutarSonido = (sonido) => {
        const audio = new Audio(sonido);
        audio.play()
    }


    //Numeros en los botones con las opciones a elegir
    const numeros = [
        { valor: [1, 3, 7, 9] },
        { valor: [2, 5, 7, 11] },
        { valor: [4, 8, 10, 12] },
        { valor: [13, 16, 19, 23] },
        { valor: [18, 21, 23, 26] },
        { valor: [15, 22, 25, 28] }
    ];

    const [indice, setIndice] = useState(0); //Indice de los objetos del array oraciones
    const sonidoActual = sonidos[indice]; //Empieza con la primera oracion
    const numActual = numeros[indice]; //Opciones de numero por ronda
    const [puntos, setPuntos] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [tiempo, setTiempo] = useState(30);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [juegoIniciado, setJuegoIniciado] = useState(false);


    //Efecto del temporizador total de 30 seg
    useEffect(() => {
        if (!juegoIniciado || juegoTerminado) return;
        if (tiempo <= 0) {
            setJuegoTerminado(true);
            setMensaje("¡Tiempo terminado!");
            actualizarPuntaje("numeros", puntos);
            return;
        }

        const intervalo = setInterval(() => {
            setTiempo((t) => t - 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [tiempo, juegoTerminado, juegoIniciado]);

    //Para que vaya cambiando de oracion
    const cambiarSonido = () => {
        if (indice < sonidos.length - 1) {
            setIndice(indice + 1);
        }
    };

    //Para que reproduzca una vez al inicio de la ronda
    useEffect(() => {
        if (!juegoIniciado || juegoTerminado) return;
        if (sonidoActual) {
            ejecutarSonido(sonidoActual.sonido);
        }
    }, [indice, juegoIniciado, juegoTerminado]);

    //Cambio de sonido cada 5 seg
    useEffect(() => {
        if (!juegoIniciado || juegoTerminado) return;
        const cambio = setInterval(() => {
            cambiarSonido();
        }, 5000);
        return () => clearInterval(cambio);
    }, [indice, juegoTerminado, juegoIniciado]);

    //Controla que hacen los botones
    const handleClick = (opcion) => {
        if (juegoTerminado) return; // no permite seguir jugando

        if (opcion === sonidoActual.correcta) {
            const nuevosPuntos = puntos + 1;
            setPuntos(nuevosPuntos);
            setMensaje("✅ ¡Correcto!");
            if (indice === sonidos.length - 1) {
                setJuegoTerminado(true);
                setMensaje("Juego terminado");
                actualizarPuntaje("numeros", nuevosPuntos);
            } else {
                cambiarSonido();
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
        setJuegoIniciado(false);
    };

    const iniciarJuego = () => {
        setJuegoIniciado(true);
        setIndice(0);
        setTiempo(30);
        setPuntos(0);
        setMensaje("");
        //ejecutarSonido(sonidos[0].sonido); // primer sonido al iniciar
    };

    //Se pasa siguiente juego y guarda los nuevos puntajes
    const irVerbos = () => {
        guardarPuntaje();
        navigate("/verbos");
    }


    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center">
            <Row className="mt-3">
                <h1>Juego de Numeros: Sube el volumen</h1>
                {juegoIniciado && (
                    <>
                        <p style={{ fontSize: "1.2rem" }}>Puntos: {puntos}   Tiempo restante: <strong>{tiempo}s</strong></p>
                        <p style={{ fontSize: "1.2rem" }}>Ronda: <strong>{indice + 1}</strong></p>
                        <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>{mensaje}</p>
                    </>
                )}
            </Row>

            {!juegoIniciado && (
                <Row>
                    <Button
                        size="lg"
                        variant="warning"
                        onClick={iniciarJuego}
                    >
                        Iniciar juego
                    </Button>
                </Row>
            )}

            {juegoIniciado && sonidoActual && (
                <Row>
                    <Button
                        size="lg"
                        variant="warning"
                        onClick={() => ejecutarSonido(sonidoActual.sonido)}
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
                        Play
                    </Button>
                </Row>
            )}

            {juegoIniciado && (
                <Row className="justify-content-center mt-4">
                    {numActual && (
                        <Col xs="auto">
                            {numActual.valor.map((num) => (
                                <Button
                                    key={num}
                                    onClick={() => handleClick(num)}
                                    variant="warning"
                                    size="lg"
                                    style={{
                                        cursor: juegoTerminado ? "not-allowed" : "pointer",
                                        opacity: juegoTerminado ? 0.5 : 1,
                                        transition: "transform 0.2s ease",
                                        marginLeft:"5px"
                                    }}
                                    onMouseEnter={(e) =>
                                        !juegoTerminado &&
                                        (e.currentTarget.style.transform = "scale(1.1)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")
                                    }
                                >
                                    {num}
                                </Button>
                            ))}
                        </Col>
                    )}
                </Row>
            )}

            {juegoTerminado && (
                <div>
                    <Button
                        onClick={reiniciarJuego}
                        variant="warning"
                        size="lg"
                        style={{
                            marginTop: "20px",
                            marginRight: "5px",
                            padding: "10px 20px",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                        }}
                    >
                        Reiniciar
                    </Button>
                    <Button
                        onClick={irVerbos}
                        variant="warning"
                        size="lg"
                        style={{
                            marginTop: "20px",
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

export default JuegoNumeros;
