import Saludo from '../components/Proyecto4/Saludo.jsx'
import JuegoColores from '../components/Proyecto4/JuegoColores.jsx';
import { Container, Row, Col } from 'react-bootstrap'
import AdivinaNumero from '../components/Proyecto4/AdivinaNumero/AdivinaNumero.jsx';

function Proyecto4() {

  //variables
  let nombre = 'Profesores';
  let apellido = 'El grupo 9';
  let edad = 20;


  return (
    <Container className="d-flex justify-content-center align-items-center mt-2 text-muted ">
      <Row>
        <Col>
          <Saludo nA={nombre} aA={apellido} edad={edad}></Saludo>
        </Col>
        <Col>
        <Row><JuegoColores /></Row>
        <Row><AdivinaNumero /></Row>         
        </Col>
      </Row>

    </ Container>
  )
}

export default Proyecto4;