import { Container, Col, Card, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Proyecto2() {
    const navigate = useNavigate();

    const irEjercicio = (id) => {
        navigate(`/ejercicio${id}`);
    };

    const ejercicios = [
        {
            id: 1,
            titulo: 'Calcula Mayor',
            subtitulo: 'Ejercicio 1',
            descripcion: 'Declarar la función calcularMayor() que recibe dos números y muestra cuál es mayor o si son iguales.',
            autor: 'Carolina Nanterne'
        },
        {
            id: 2,
            titulo: 'Promedio de Tres Números',
            subtitulo: 'Ejercicio 2',
            descripcion: 'Solicitar tres números al usuario y mostrar su promedio.',
            autor: 'Cecilia Tactaca'
        },
        {
            id: 3,
            titulo: 'Cadena de Caracteres',
            subtitulo: 'Ejercicio 3',
            descripcion: 'Solicitar al usuario que ingrese una cadena de N caracteres. Cada uno de estos N caracteres es o bien un dígito entre 0 y 4 inclusive, o bien un signo de pregunta ?.',
            autor: 'Gonzalo Gomez'
        },
        {
            id: 4,
            titulo: 'Formulario Universitario',
            subtitulo: 'Ejercicio 4',
            descripcion: 'Crear una página que muestre 3 campos: Nombre, Apellido y Libreta Universitaria y muestra los datos con un alert.',
            autor: 'Matias Aramayo'
        },
        {
            id: 5,
            titulo: 'Simulador de Salario',
            subtitulo: 'Ejercicio 5',
            descripcion: 'Calcula el salario mensual considerando horas trabajadas, pago por hora y bono de 20% si la cantidad de horas trabajadas es mayor a 160.',
            autor: 'Luca Palma'
        }
    ];

    return (
        <Container className="mt-5">
            <Row className="g-4">
                {ejercicios.map((ej) => (
                    <Col key={ej.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="h-100">
                            <div className="flex-grow-1">
                                <Card.Body className="h-100 d-flex flex-column">
                                    <Card.Subtitle className="mb-2 text-muted">{ej.subtitulo}</Card.Subtitle>
                                    <Card.Title>{ej.titulo}</Card.Title>
                                    <Card.Text>{ej.descripcion}</Card.Text>
                                    <Card.Text>Autor/a: {ej.autor}</Card.Text>
                                    <Button variant="primary" className="mt-auto" onClick={() => irEjercicio(ej.id)}>
                                        Abrir ejercicio {ej.id}
                                    </Button>
                                </Card.Body>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Proyecto2;
