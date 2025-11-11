import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function JuegoColores() {
  const colores = [
    { nombre: "Red", codigo: "#ff0000ff" },
    { nombre: "Blue", codigo: "#0040ffff" },
    { nombre: "Green", codigo: "#00ff00ff" },
    { nombre: "Yellow", codigo: "#ffcc00ff" },
    { nombre: "Purple", codigo: "#8000ffff" },
    { nombre: "Orange", codigo: "#ff6600ff" },
    { nombre: "Pink", codigo: "#ff2693ff" },
    { nombre: "Gray", codigo: "#414141ff" },
    { nombre: "Black", codigo: "#000000ff" },
  ];

  const [colorActual, setColorActual] = useState(
    colores[Math.floor(Math.random() * colores.length)]
  );
  const [puntos, setPuntos] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [tiempo, setTiempo] = useState(10); // 1 minuto = 60 segundos
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // ⏱️ Efecto del temporizador
  useEffect(() => {
    if (tiempo <= 0) {
      setJuegoTerminado(true);
      setMensaje("¡Tiempo terminado!");
      return;
    }

    const intervalo = setInterval(() => {
      setTiempo((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempo]);

  const handleClick = (nombre) => {
    if (juegoTerminado) return; // no permite seguir jugando

    if (nombre === colorActual.nombre) {
      setPuntos(puntos + 1);
      setMensaje("✅ ¡Correcto!");
      setColorActual(colores[Math.floor(Math.random() * colores.length)]);
    } else {
      setMensaje("❌ Incorrecto, intenta de nuevo");
    }
  };

  const reiniciarJuego = () => {
    setPuntos(0);
    setTiempo(60);
    setMensaje("");
    setJuegoTerminado(false);
    setColorActual(colores[Math.floor(Math.random() * colores.length)]);
  };
  
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a7f0ff, #0e8bff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1> JUEGO DE COLORES EN INGLES</h1>
      <p style={{ fontSize: "1.2rem" }}>Puntos: {puntos}</p>
      <p style={{ fontSize: "1.2rem" }}>
        Tiempo restante: <strong>{tiempo}s</strong>
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {colores.map((color) => (
          <Button
            key={color.nombre}
            onClick={() => handleClick(color.nombre)}
            style={{
              backgroundColor: color.codigo,
              border: "none",
              width: "80px",
              height: "80px",
              borderRadius: "10px",
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
          ></Button>
        ))}
      </div>

      <h2 style={{ marginTop: "30px", fontSize: "2rem" }}>
        {colorActual.nombre}
      </h2>

      <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>{mensaje}</p>

      {juegoTerminado && (
        <Button
          onClick={reiniciarJuego}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#fff700ff",
            color: "black",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          Reiniciar juego
        </Button>
      )}
    </div>
  );
}

export default JuegoColores;