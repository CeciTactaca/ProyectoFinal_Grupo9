import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Ejercicio5() {
  const [nombre, setNombre] = useState('');
  const [horas, setHoras] = useState('');
  const [pago, setPago] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularSalario = () => {
    const h = Number(horas);
    const p = Number(pago);

    if (isNaN(h) || isNaN(p) || nombre.trim() === '') {
      setResultado('Por favor, completa todos los campos correctamente.');
      return;
    }

    let salario = h * p;
    if (h > 160) {
      salario *= 1.2;
    }

    setResultado(`${nombre}, tu salario es de: $${salario.toFixed(2)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calcularSalario();
  };

  return (
    <Container className="mt-5">
      <section className="seccion-formulario">
        <h1>Simulador de Salario Mensual</h1>
        <h2>Ingresa tus datos y calcula tu pago mensual</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Horas trabajadas al mes:</Form.Label>
            <Form.Control
              type="number"
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pago por hora:</Form.Label>
            <Form.Control
              type="number"
              value={pago}
              onChange={(e) => setPago(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Calcular Pago
          </Button>
        </Form>

        {resultado && (
          <Alert variant="info" className="mt-4">
            {resultado}
          </Alert>
        )}
      </section>
    </Container>
  );
}

export default Ejercicio5;
