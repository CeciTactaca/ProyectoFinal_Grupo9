import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePuntaje } from "../hooks/usePuntaje";
import { FaVolumeUp } from "react-icons/fa";
//Audios que se usaran
import uno from "../assets/sounds/JuegoNumeros/uno.wav";
import tres from "../assets/sounds/JuegoNumeros/tres.wav";
import cinco from "../assets/sounds/JuegoNumeros/cinco.wav";
import siete from "../assets/sounds/JuegoNumeros/siete.wav";
import nueve from "../assets/sounds/JuegoNumeros/nueve.wav";
import once from "../assets/sounds/JuegoNumeros/once.wav";
import doce from "../assets/sounds/JuegoNumeros/doce.wav";
import catorce from "../assets/sounds/JuegoNumeros/catorce.wav";
import dieciseis from "../assets/sounds/JuegoNumeros/dieciseis.wav";
import dieciocho from "../assets/sounds/JuegoNumeros/dieciocho.wav";
import diecinueve from "../assets/sounds/JuegoNumeros/diecinueve.wav";
import veintiuno from "../assets/sounds/JuegoNumeros/veintiuno.wav";
import veintitres from "../assets/sounds/JuegoNumeros/veintitres.wav";
import veinticinco from "../assets/sounds/JuegoNumeros/veinticinco.wav";
import veintisiete from "../assets/sounds/JuegoNumeros/veintisiete.wav";
import veintinueve from "../assets/sounds/JuegoNumeros/veintinueve.wav";

function JuegoNumeros() {

    //Para guardar el puntaje del juego y el total
    const { actualizarPuntaje } = usePuntaje();

    const navigate = useNavigate();

    //Numeros que van a ir cambiando
    const sonidos = [
        { sonido: uno, correcta: 1 },
        { sonido: tres, correcta: 3 },
        { sonido: cinco, correcta: 5 },
        { sonido: siete, correcta: 7 },
        { sonido: nueve, correcta: 9 },
        { sonido: once, correcta: 11 },
        { sonido: doce, correcta: 12 },
        { sonido: catorce, correcta: 14 },
        { sonido: dieciseis, correcta: 16 },
        { sonido: dieciocho, correcta: 18 },
        { sonido: diecinueve, correcta: 19 },
        { sonido: veintiuno, correcta: 21 },
        { sonido: veintitres, correcta: 23 },
        { sonido: veinticinco, correcta: 25 },
        { sonido: veintisiete, correcta: 27 },
        { sonido: veintinueve, correcta: 29 }
    ];

    const ejecutarSonido = (sonido) => {
        const audio = new Audio(sonido);
        audio.play()
    }



    const [indice, setIndice] = useState(0); //Indice de los objetos del array oraciones
    const sonidoActual = sonidos[indice]; //Empieza con la primera oracion
    const [opciones, setOpciones] = useState([]);
    const [puntos, setPuntos] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [tiempo, setTiempo] = useState(60); //1minuto de juego
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [juegoIniciado, setJuegoIniciado] = useState(false);


    //Genera las opciones para los botones
    const generarOpciones = (correcta) => {
        const opciones = [correcta];//opciones tiene la opcion correcta

        // Números aleatorios 
        while (opciones.length < 4) {
            const randomNum = Math.floor(Math.random() * 30) + 1;
            if (!opciones.includes(randomNum)) {
                opciones.push(randomNum);
            }
        }

        // Mezclar el array
        return opciones.sort(() => Math.random() - 0.5);
    };


    //Efecto del temporizador total de 60 seg
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

    //Para que vaya cambiando de sonido
    const cambiarSonido = () => {
        if (indice < sonidos.length - 1) {
            setIndice(indice + 1);
        }
    };

    //Para que reproduzca una vez al inicio de la ronda y genere las opciones
    useEffect(() => {
        if (!juegoIniciado || juegoTerminado) return;
        if (sonidoActual) {
            ejecutarSonido(sonidoActual.sonido);
            setOpciones(generarOpciones(sonidoActual.correcta));
        }
    }, [indice, juegoIniciado, juegoTerminado]);


    //Cambio de sonido cada 10 seg
    useEffect(() => {
        if (!juegoIniciado || juegoTerminado) return;
        const cambio = setInterval(() => {
            cambiarSonido();
        }, 10000);
        return () => clearInterval(cambio);
    }, [indice, juegoTerminado, juegoIniciado]);

    //Controla que hacen los botones
    const handleClick = (opcion) => {
        if (juegoTerminado) return; // no permite seguir jugando

        if (opcion === sonidoActual.correcta) {
            const nuevosPuntos = puntos + 1;
            setPuntos(nuevosPuntos);
            setMensaje("✅ ¡Correcto!");

        } else {
            setMensaje("❌ Incorrecto, intenta de nuevo");
        }
        if (indice === sonidos.length - 1) {
            setJuegoTerminado(true);
            setMensaje("Juego terminado");
            actualizarPuntaje("numeros", puntos);
        } else {
            cambiarSonido();
        }

    };

    const reiniciarJuego = () => {
        setPuntos(0);
        setTiempo(60);
        setMensaje("");
        setJuegoTerminado(false);
        setIndice(0);
        setJuegoIniciado(false);
    };

    const iniciarJuego = () => {
        setJuegoIniciado(true);
        setIndice(0);
        setTiempo(60);
        setPuntos(0);
        setMensaje("");
    };

    //Se pasa siguiente juego y guarda los nuevos puntajes
    const irVerbos = () => {
        navigate("/games/verbos");
    }


    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center">
            <Row className="mt-3">
                <h1>Juego de Numeros: Sube el volumen</h1>
                {juegoIniciado && (
                    <>
                        <p style={{ fontSize: "1.2rem" }}>🏆 Puntos: {puntos}  ⏱ Tiempo restante: <strong>{tiempo}s</strong></p>
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
                        <FaVolumeUp /> Play
                    </Button>
                </Row>
            )}

            {juegoIniciado && (
                <Row className="justify-content-center mt-4">

                    <Col xs="auto">
                        {opciones.map((num) => (
                            <Button
                                key={num}
                                onClick={() => handleClick(num)}
                                variant="warning"
                                size="lg"
                                style={{
                                    cursor: juegoTerminado ? "not-allowed" : "pointer",
                                    opacity: juegoTerminado ? 0.5 : 1,
                                    transition: "transform 0.2s ease",
                                    marginLeft: "5px"
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
