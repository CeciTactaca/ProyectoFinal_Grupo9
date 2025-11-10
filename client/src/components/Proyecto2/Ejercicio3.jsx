import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Ejercicio3() {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState([]);

  const procesarCadena = () => {
    const numeros = entrada.split('');
    let num1 = 0;
    let num2 = 0;
    let signo = 0;
    let nueva_lista = [];

    for (let i = 0; i < numeros.length; i++) {
      if (numeros[i] !== '?') {
        if (signo === '?') {
          signo = parseInt(numeros[i]) + num2;
          nueva_lista[i - 1] = signo;
        }
        num1 = parseInt(numeros[i]);
        nueva_lista[i] = isNaN(num1) ? 0 : num1;
      } else {
        num2 = parseInt(num1);
        signo = '?';
        if (isNaN(num2)) {
          num2 = 0;
        }
        if (i === numeros.length - 1) {
          signo = num1;
          nueva_lista[i] = signo;
        }
      }
    }

    setResultado(nueva_lista);
  };

  const handleSubmit = e => {
    e.preventDefault();
    procesarCadena();
  };

  return (
    <Container className="mt-5">
      <h2>Procesador de Cadena con "?"</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Ingresa una cadena de números y "?"</Form.Label>
          <Form.Control
            type="text"
            value={entrada}
            onChange={e => setEntrada(e.target.value)}
            placeholder='Ejemplo: 3?5'
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">Procesar</Button>
      </Form>

      {resultado.length > 0 && (
        <Alert variant="info" className="mt-4">
          Resultado: {resultado.join(', ')}
        </Alert>
      )}
    </Container>
  );
}

export default Ejercicio3;
