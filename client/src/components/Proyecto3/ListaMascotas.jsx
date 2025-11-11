import { Card, Container } from 'react-bootstrap';

function ListaMascotas({ mascotas }) {

  const total = mascotas.length;
  const vacunadas = mascotas.filter(m => m.vacunada === true).length;
  const noVacunadas = total - vacunadas;

  return (
    <Container className="mt-5">
      <h2>Mascotas Registradas</h2>
      <div className="mt-4">
        <p><b>Total:</b> {total}</p>
        <p><b>Vacunadas:</b> {vacunadas}</p>
        <p><b>No vacunadas:</b> {noVacunadas}</p>
      </div>
    </Container>
  );
}

export default ListaMascotas;
