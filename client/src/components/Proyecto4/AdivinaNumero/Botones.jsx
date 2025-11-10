function Botones({ verificar, rendirse }) {
  return (
    <div className="d-flex justify-content-center gap-3 mb-3">
      <button className="btn btn-primary" onClick={verificar}>
        Verificar
      </button>
      <button className="btn btn-danger" onClick={rendirse}>
        Me rindo
      </button>
    </div>
  );
}

export default Botones;