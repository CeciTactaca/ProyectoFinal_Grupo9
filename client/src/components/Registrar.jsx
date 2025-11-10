import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const PASSWORD_REGEX = {
    minLength: /^.{8,}$/,
    uppercase: /(?=.*[A-Z])/,
    lowercase: /(?=.*[a-z])/,
    number: /(?=.*\d)/,
    isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
};

function Registrar() {
    const [regError, setRegError] = useState('');
    const [validado, setValidado] = useState(false);
    const [errorPassword, setErrorPassword] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
    });

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento: new Date(),
        estado: true,
        username: '',
        password: '',
        rol: 'ADMINISTRATIVO',
        puntaje: 0
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setUsuario(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === 'password') {
            setErrorPassword({
                minLength: !PASSWORD_REGEX.minLength.test(value),
                uppercase: !PASSWORD_REGEX.uppercase.test(value),
                lowercase: !PASSWORD_REGEX.lowercase.test(value),
                number: !PASSWORD_REGEX.number.test(value),
            });
        }
    }

    const manejarSubmit = async (e) => {
        setRegError('');
        const form = e.currentTarget;
        const passwordValido = PASSWORD_REGEX.isValid.test(usuario.password);

        e.preventDefault();

        if (form.checkValidity() === false || !passwordValido) {
            setValidado(true);
            alert('Por favor, complete el formulario correctamente antes de enviar.');
        } else {
            alert('Formulario enviado correctamente ' + usuario.nombre + ' ' + usuario.apellido);


            try {
                const response = await axios.post('/api/registrarUsuario', usuario);

                if (response.data.success) {
                    console.log('Usuario registrado con exito en la base de datos');
                    alert('Usuario registrado con exito');
                } else {
                    setRegError(response.data.message || 'Error al registrar usuario. Por favor, intente nuevamente.');
                }
            } catch (error) {
                console.error('Error de registro o conexion:', error);
                setRegError(error.message || 'Ocurrio un error inesperado al registrar el usuario. Por favor, intente nuevamente.');
            }

            setUsuario({ nombre: '', apellido: '',  username: '', password: '' });
            setValidado(false)
            setErrorPassword({ minLength: false, uppercase: false, lowercase: false, number: false });
        }
    };


        const passwordInvalido = Object.values(errorPassword).some(error => error);

        return (
            <>
                <Form noValidate validated={validado} onSubmit={manejarSubmit} className="p-4 border rounded shadow">
                    <Row className="mb-3" >
                        <Form.Group as={Col} md="6" className="mb-3" controlId="validacionNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required type="text" name="nombre" value={usuario.nombre} onChange={manejarCambio} placeholder="Ingrese su nombre" />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingrese su nombre.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validacionApellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                required type="text" name="apellido" value={usuario.apellido} onChange={manejarCambio} placeholder="Ingrese su apellido" />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingrese su apellido.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group controlId="validacionFechaNacimiento">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control
                            required type="date" name="fechaNacimiento" value={usuario.fechaNacimiento} onChange={manejarCambio} placeholder="Ingrese su fecha de nacimiento" />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese su fecha de nacimiento.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validacionUsername">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control
                            required type="text" name="username" value={usuario.username} onChange={manejarCambio} placeholder="Ingrese su usuario" minLength="5" />
                        <Form.Control.Feedback type="invalid">
                            El nombre del usuario debe ser requerido y tener al menos 5 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control required type="password" name="password" value={usuario.password} onChange={manejarCambio} placeholder="Ingrese su contraseña" isInvalid={validado && passwordInvalido} />
                        <Form.Control.Feedback type="invalid" className={validado && passwordInvalido ? 'd-block' : ''}>
                            <p className="mb-1 text-bold">La contraseña debe cumplir con: </p>
                            <small className={errorPassword.minLength ? 'text-danger' : 'text-succes'}>
                                {errorPassword.minLength ? 'No cumple' : 'Cumple'}Al menos 8 caracteres</small><br />
                            <small className={errorPassword.lowercase ? 'text-danger' : 'text-success'}>
                                {errorPassword.lowercase ? 'No cumple' : 'Cumple'}Al menos una letra minúscula</small><br />
                            <small className={errorPassword.uppercase ? 'text-danger' : 'text-success'}>
                                {errorPassword.uppercase ? 'No cumple' : 'Cumple'}Al menos una letra mayúscula</small><br />
                            <small className={errorPassword.number ? 'text-danger' : 'text-success'}>
                                {errorPassword.number ? 'No cumple' : 'Cumple'}Al menos un número
                            </small>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="warning" className="w-100 mt-4">Registrarse</Button>
                </Form>
            </>
        )
    }

    export default Registrar;


