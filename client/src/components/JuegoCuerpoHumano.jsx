import { useState, useEffect } from "react";
import cuerpoHumano from "../assets/img/cuerpo-humano.png";
import { Button, Container, Row, Col } from "react-bootstrap";
import { usePuntaje } from "../hooks/usePuntaje";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function JuegoCuerpoHumano() {

    const { actualizarPuntaje, guardarPuntaje } = usePuntaje();
    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState("");
    const [puntaje, setPuntaje] = useState(0);
    const [tiempo, setTiempo] = useState(20);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    const partes = [
        "Head",
        "Arm",
        "Hand",
        "Legs",
        "Foot",
        "Eye",
        "Ear",
        "Mouth",
        "Nose",
        "Knee"
    ];

    const [parteActual, setParteActual] = useState("");

    //Genera una nueva parte random y que no se repita
    const generarJuego = () => {
        let nuevoRandom;
        do {
            nuevoRandom = partes[Math.floor(Math.random() * partes.length)];
        } while (nuevoRandom === parteActual);

        setParteActual(nuevoRandom);
    };

    // Inicializar
    useEffect(() => {
        generarJuego();
    }, []);

    // Temporizador
    useEffect(() => {
        if (juegoTerminado) return;
        if (tiempo <= 0) {
            setJuegoTerminado(true);
            setMensaje("¡Tiempo terminado!");
            actualizarPuntaje("cuerpoHumano", puntaje);
            return;
        }

        const intervalo = setInterval(() => {
            setTiempo((t) => t - 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [tiempo, juegoTerminado]);

    const verificarRespuesta = (respuesta) => {
        if (juegoTerminado) return;

        if (respuesta === parteActual) {
            setMensaje("¡Correcto! 🎉");
            setPuntaje(p => p + 1);

            setTimeout(() => {
                generarJuego();
            }, 200);
        } else {
            setMensaje("Incorrecto ❌");

        }
    };

    const reiniciarJuego = () => {
        setPuntaje(0);
        setTiempo(20);
        setMensaje("");
        setJuegoTerminado(false);
    }

    //Se pasa a ver el puntaje final y guarda los nuevos puntajes
    const irPuntaje = () => {
        guardarPuntaje();
        navigate("/puntaje");
    }

    return (


        <Container className="shadow-d-flex justify-content-center text-center">
            <h2 className="mb-2">Identifica la parte del cuerpo</h2>

            <p>⏱ Tiempo: {tiempo}s 🏆 Puntaje: {puntaje}</p>
            <p className="fs-4">
                Selecciona:
                <strong> {parteActual}</strong>
            </p>
            <Row >
                <Col className="mb-2 d-flex align-items-center justify-content-center">
                    <div style={{ position: "relative", width: "100%", maxWidth: "350px" }}>

                        {/* Imagen del cuerpo humano */}
                        <img
                            src={cuerpoHumano}
                            alt="Cuerpo humano"
                            style={{ width: "100%" }}
                        />

                        {/* Ojo */}
                        <div
                            onClick={() => verificarRespuesta("Eye")}
                            style={{
                                position: "absolute",
                                top: "7.5%",   // porcentaje relativo al alto
                                left: "8%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255,200,0,0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* Nariz */}
                        <div
                            onClick={() => verificarRespuesta("Nose")}
                            style={{
                                position: "absolute",
                                top: "24.5%",   // porcentaje relativo al alto
                                left: "8%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255,200,0,0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* Cabeza */}
                        <div
                            onClick={() => verificarRespuesta("Head")}
                            style={{
                                position: "absolute",
                                top: "7.5%",   // porcentaje relativo al alto
                                left: "76%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 200, 140, 0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* Oreja */}
                        <div
                            onClick={() => verificarRespuesta("Ear")}
                            style={{
                                position: "absolute",
                                top: "24.5%",   // porcentaje relativo al 
                                left: "76%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 200, 0, 0.2)",
                                cursor: "pointer"
                            }}
                        />


                        {/* Boca */}
                        <div
                            onClick={() => verificarRespuesta("Mouth")}
                            style={{
                                position: "absolute",
                                top: "41.6%",   // porcentaje relativo al alto
                                left: "8%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 200, 0, 0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* Piernas */}
                        <div
                            onClick={() => verificarRespuesta("Legs")}
                            style={{
                                position: "absolute",
                                top: "58.5%",   // porcentaje relativo al alto
                                left: "8%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255,200,0,0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* Rodilla */}
                        <div
                            onClick={() => verificarRespuesta("Knee")}
                            style={{
                                position: "absolute",
                                top: "75.3%",   // porcentaje relativo al alto
                                left: "8%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 200, 0, 0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* Mano */}
                        <div
                            onClick={() => verificarRespuesta("Hand")}
                            style={{
                                position: "absolute",
                                top: "41.6%",   // porcentaje relativo al alto
                                left: "76%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 200, 0, 0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* Brazo */}
                        <div
                            onClick={() => verificarRespuesta("Arm")}
                            style={{
                                position: "absolute",
                                top: "58.5%",   // porcentaje relativo al alto
                                left: "76%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 255, 0, 0.2)",
                                cursor: "pointer"
                            }}
                        />

                        {/* pie */}
                        <div
                            onClick={() => verificarRespuesta("Foot")}
                            style={{
                                position: "absolute",
                                top: "75.3%",   // porcentaje relativo al alto
                                left: "76%",  // porcentaje relativo al ancho
                                width: "16%",
                                height: "16%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 200, 0, 0.2)",
                                cursor: "pointer"
                            }}
                        />
                    </div>
                </Col>
            </Row>

            <p className="fs-4">{mensaje}</p>

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
                        onClick={irPuntaje}
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
                        Terminar Diagnostico
                    </Button>
                </div>
            )}
        </Container>


    );
}
