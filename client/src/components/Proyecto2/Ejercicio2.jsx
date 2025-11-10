import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Ejercicio2() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [numero3, setNumero3] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularPromedio = () => {
    const n1 = parseInt(numero1);
    const n2 = parseInt(numero2);
    const n3 = parseInt(numero3);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      setResultado('Por favor, ingresa solo números válidos.');
      return;
    }

    const promedio = (n1 + n2 + n3) / 3;
    setResultado(`El promedio es: ${promedio}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    calcularPromedio();
  };

  return (
    <Container className="mt-5">
      <h2>Calculadora de Promedio</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Primer número</Form.Label>
          <Form.Control
            type="number"
            value={numero1}
            onChange={e => setNumero1(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Segundo número</Form.Label>
          <Form.Control
            type="number"
            value={numero2}
            onChange={e => setNumero2(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tercer número</Form.Label>
          <Form.Control
            type="number"
            value={numero3}
            onChange={e => setNumero3(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">Calcular Promedio</Button>
      </Form>

      {resultado && (
        <Alert variant="info" className="mt-4">
          {resultado}
        </Alert>
      )}
    </Container>
  );
}

export default Ejercicio2;
