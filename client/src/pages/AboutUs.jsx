import { Container, Col, Card, Row, Nav } from "react-bootstrap";
import { FaGithub } from 'react-icons/fa';


function AboutUs() {

  const alumnos = [
    {
      id: 1,
      titulo: 'Matias Aramayo',
      descripcion: '',
      gitHub: 'https://github.com/matiaszzz'
    },
    {
      id: 2,
      titulo: 'Gonzalo Gomez',
      descripcion: '',
      gitHub: 'https://github.com/GonzG1811'
    },
    {
      id: 3,
      titulo: 'Lucas Palma',
      descripcion: '',
      gitHub: 'https://github.com/Luca-Palma'
    },
    {
      id: 4,
      titulo: 'Cecilia Tactaca',
      descripcion: '',
      gitHub: 'https://github.com/CeciTactaca'
    }
  ]

  return (
    <Container className="mt-5">
      <h1>Sobre Nosotros</h1>
      <Row className="g-4">
        {alumnos.map((al) => (
          <Col key={al.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100">
              <div className="flex-grow-1">
                <Card.Body className="h-100 d-flex flex-column">
                  <Card.Title>{al.titulo}</Card.Title>
                  <Card.Text>L.U.: {al.descripcion}</Card.Text>
                  <Nav.Link className="mt-auto" style={{ color: 'blue' }} href={al.gitHub} target="_blank"
                    rel="noopener noreferrer">
                    <FaGithub size={24} color="black" /> GitHub
                  </Nav.Link>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

  )
};

export default AboutUs;