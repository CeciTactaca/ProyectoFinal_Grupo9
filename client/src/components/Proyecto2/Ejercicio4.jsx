import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Ejercicio4() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [libreta, setLibreta] = useState('');

  const obtenerDatos = () => {
    alert(
      `Los datos ingresados son:\nNombre: ${nombre},\nApellido: ${apellido},\nLibreta universitaria: ${libreta}`
    );
  };

  return (
    <Container className="mt-5">
      <div className="contenedor">
        <section className="seccion-alumnos">
          <Form className="formulario">
            <Form.Group className="mb-3">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                id="surname"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Libreta Universitaria:</Form.Label>
              <Form.Control
                type="text"
                id="libreta"
                value={libreta}
                onChange={(e) => setLibreta(e.target.value)}
              />
            </Form.Group>
          </Form>

          <Button id="datos" onClick={obtenerDatos} variant="primary">
            Obtener Datos
          </Button>
        </section>
      </div>
    </Container>
  );
}

export default Ejercicio4;
