function InputNumero({ intento, setIntento }) {
  return (
    <div className="d-flex justify-content-center mb-3">
      <input
        type="number"
        value={intento}
        onChange={(e) => setIntento(e.target.value)}
        placeholder="Escribe un número"
        className="form-control w-50 text-center"
      />
    </div>
  );
}

export default InputNumero;