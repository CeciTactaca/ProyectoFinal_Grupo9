import { useState, useEffect, useRef } from "react";
import cuerpoHumano from "../assets/img/cuerpo-humano.png";
import { Button } from "react-bootstrap";
import { usePuntaje } from "../hooks/usePuntaje";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const partes = {
    head: "Cabeza",
    arm: "Brazo",
    hand: "Mano",
    leg: "Pierna",
    foot: "Pie",
    eye: "Ojo",
    ear: "Oreja",
    mouth: "Boca",
    nose: "Nariz",
};

// Recorremos las keys para obtener solo los nombres en inglés
const partesKeys = Object.keys(partes);

export default function JuegoCuerpoHumano() {
    const { actualizarPuntaje, guardarPuntaje } = usePuntaje();
    const navigate = useNavigate();
    const [parteCorrecta, setParteCorrecta] = useState(null);
    const [opciones, setOpciones] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [puntaje, setPuntaje] = useState(0);
    const [tiempo, setTiempo] = useState(15);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    const intervalo = useRef(null);

    const generarJuego = () => {
        const nuevaParte = partesKeys[Math.floor(Math.random() * partesKeys.length)];
        setParteCorrecta(nuevaParte);

        const incorrectas = partesKeys
            .filter((part) => part !== nuevaParte)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);

        const opcionesMezcladas = [...incorrectas, nuevaParte].sort(() => Math.random() - 0.5);

        setOpciones(opcionesMezcladas);
        setMensaje("");
        setTiempo(15);
        setJuegoTerminado(false);
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

        if (respuesta === parteCorrecta) {
            setMensaje("¡Correcto! 🎉");
            setPuntaje(p => p + 1);
 
            clearInterval(intervalo.current);

            setTimeout(() => {
                generarJuego();
            }, 1200);
        } else {
            setMensaje("Incorrecto ❌");

        }
    };

    const reiniciarJuego = () => {
        setPuntos(0);
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
        <>
        <div className="container text-center mt-2">
            <div className="card p-4 shadow-lg">
                <h2 className="mb-3">Identifica la parte del cuerpo</h2>

                <p className="fs-4">
                    Selecciona en inglés:
                    <strong> {partes[parteCorrecta]}</strong>
                </p>

                {/* Imagen del cuerpo humano */}
                <img
                    src={cuerpoHumano}
                    alt="Cuerpo humano"
                    style={{ width: "300px", height: "300px", margin: "10px auto" }}
                />

                {/* Botones */}
                <div className="my-3">
                    {opciones.map((op) => (
                        <button
                            key={op}
                            onClick={() => verificarRespuesta(op)}
                            className="btn btn-warning btn-lg m-2"
                        >
                            {op}
                        </button>
                    ))}
                </div>

                <p className="fs-3 mt-3">{mensaje}</p>

                <div className="d-flex justify-content-center gap-4 mt-2">
                    <h4>⏱ Tiempo: {tiempo}s</h4>
                    <h4>🏆 Puntaje: {puntaje}</h4>
                </div>

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
            </div>
        </div>
        </>
    );
}
