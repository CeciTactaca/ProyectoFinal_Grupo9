import { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import ListaMascotas from './ListaMascotas';

function FormMascotas() {

    const [mascotas, setMascotas] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        tipo: '',
        edad: '',
        duenio: '',
        vacunada: true
    });

    useEffect(() => {
        console.log(mascotas)
    }, [mascotas]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const agregarMascota = (e) => {
        e.preventDefault()
        const nuevaMascota = {
            ...form,
            id: Date.now(),
            nombre: form.nombre,
            edad: parseInt(form.edad),
            duenio: form.duenio,
            vacunada: form.vacunada === 'si'
        }
        setMascotas([...mascotas, nuevaMascota])
        setForm({
            id: '',
            nombre: '',
            edad: '',
            duenio: '',
            vacunada: ''
        });
    }

    const eliminarMascota = (id) => {
        const nuevasMascotas = mascotas.filter(m => m.id !== id);
        setMascotas(nuevasMascotas);
    };


    return (
        <Container className="mt-4">
            <h1>Registro de Mascotas</h1>
            <p className="text-muted">Registra las mascotas de tus clientes y lleva un control de su estado de vacunación.</p>
            <Form onSubmit={agregarMascota}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre de la mascota</Form.Label>
                    <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo de mascota</Form.Label>
                    <Form.Select name="tipo" value={form.tipo} onChange={handleChange} required>
                        <option value="">Selecciona...</option>
                        <option>Perro</option>
                        <option>Gato</option>
                        <option>Conejo</option>
                        <option>Pájaro</option>
                        <option>Otro</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Edad (años)</Form.Label>
                    <Form.Control type="number" name="edad" min="0" value={form.edad} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre del dueño</Form.Label>
                    <Form.Control type="text" name="duenio" value={form.duenio} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>¿Está vacunada?</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Sí"
                            name="vacunada"
                            type="radio"
                            value="si"
                            checked={form.vacunada === 'si'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="vacunada"
                            type="radio"
                            value="no"
                            checked={form.vacunada === 'no'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                <Button variant="success" type="submit">Registrar Mascota</Button>
            </Form>
            {mascotas.length > 0 && <h2>Lista de Mascotas</h2>}
            < ul >
                {
                    mascotas.map(m => (
                        <li key={m.id}>
                            <div>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{m.nombre}</Card.Title>
                                        <Card.Text>
                                            Edad: {m.edad}
                                        </Card.Text>
                                        <Card.Text>
                                            Dueño: {m.duenio}
                                        </Card.Text>
                                        <Card.Text>
                                            Vacunada: {m.vacunada === true ? 'Sí' : 'No'}
                                        </Card.Text>
                                        <Button variant="success" onClick={() => eliminarMascota(m.id)}>
                                            Eliminar
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </li>
                    ))
                }
            </ul >
            <ListaMascotas mascotas={mascotas} />
        </Container>
    );
}

export default FormMascotas;
