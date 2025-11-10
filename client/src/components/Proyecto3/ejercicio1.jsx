import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { hallarX } from './operaciones.js';

function Ejercicio1() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const numeros = [num1, num2, num3];
    const res = hallarX(numeros);
    setResultado(res);
  };

  return (
    <Container className="mt-5">
      <h2>Ejercicio 1</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Primer número (o 'x')</Form.Label>
          <Form.Control value={num1} onChange={e => setNum1(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Segundo número (o 'x')</Form.Label>
          <Form.Control value={num2} onChange={e => setNum2(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Resultado</Form.Label>
          <Form.Control value={num3} onChange={e => setNum3(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={calcular}>Calcular</Button>
      </Form>

      {resultado && (
        <Alert variant="info" className="mt-3">
          El valor de x es: <strong>{resultado}</strong>
        </Alert>
      )}
    </Container>
  );
}

export default Ejercicio1;
