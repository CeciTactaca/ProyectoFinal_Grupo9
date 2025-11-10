import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Ejercicio1() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularMayor = () => {
    const n1 = parseFloat(numero1);
    const n2 = parseFloat(numero2);

    if (isNaN(n1) || isNaN(n2)) {
      setResultado('Tienes que ingresar números válidos.');
      return;
    }

    if (n1 > n2) {
      setResultado(`El número mayor es: ${n1}`);
    } else if (n2 > n1) {
      setResultado(`El número mayor es: ${n2}`);
    } else {
      setResultado(`Ambos números son iguales: ${n1}`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    calcularMayor();
  };

  return (
    <Container className="mt-5">
      <h2>Comparador de Números</h2>
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

        <Button type="submit" variant="primary">Comparar</Button>
      </Form>

      {resultado && (
        <Alert variant="info" className="mt-4">
          {resultado}
        </Alert>
      )}
    </Container>
  );
}

export default Ejercicio1;
