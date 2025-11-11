import { useState } from "react";

function AdivinaNumero (){

  const [numeroSecreto] = useState(Math.floor(Math.random() * 100) + 1);
  const [intentos, setIntentos] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const verificar = () => {
    const valor = Number(inputValue);
    setIntentos(intentos + 1);

    if (valor === numeroSecreto) {
      setMensaje(`¡Adivinaste! El número era ${numeroSecreto}. Intento número ${intentos + 1}`);
      setDisabled(true);
    } else if (valor > numeroSecreto) {
      setMensaje(`El número ${valor} es muy alto`);
    } else {
      setMensaje(`El número ${valor} es muy bajo`);
    }
  };

  const rendirse = () => {
    setMensaje(`Te rendiste 😢. El número era ${numeroSecreto}`);
    setDisabled(true);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Adivina el número</h1>

      <p>Ingresa un número entre 1 y 100</p>
      <p>Cantidad de intentos: <span>{intentos}</span></p>

      <input
        type="number"
        className="form-control w-50 mx-auto mb-3"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled}
      />

      <div className="d-flex justify-content-center gap-2 mb-3">
        <button className="btn btn-primary" onClick={verificar} disabled={disabled}>
          Verificar
        </button>
        <button className="btn btn-secondary" onClick={rendirse} disabled={disabled}>
          Me rindo
        </button>
      </div>

      <p id="mensaje" className="fw-bold">{mensaje}</p>
    </div>

  );

};

export default AdivinaNumero;