import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion";
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { FaUserCircle } from "react-icons/fa";
import { TbLockFilled } from "react-icons/tb";


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated, user } = useAutorizacion();

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.rol === 'ADMINISTRATIVO') {
                navigate('/aboutus', { replace: true });
            } else if (user?.rol === 'ALUMNO') {
                navigate('/aboutus', { replace: true });
            } else {
                navigate('/error', { replace: true });
            }
        }
    }, [isAuthenticated, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); //Limpia errores anteriores 

        if (!username || !password) {
            setLoginError('Por favor, ingrese su usuario y contraseña.');
            return;
        }

        const result = await login({ username, password });
        if (!result.success) {
            setLoginError(result.message || 'Error de autenticacion.');
        }
    };

    const irARegistrar = () => {
        navigate("/registrar");
    }

    return (
            <Container
                className="d-flex justify-content-end align-items-start pad-4">
                <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow-sm">
                    <Card.Body className="p-4">
                        <Card.Title as="h2" className="text-center mb-4">
                            Iniciar Sesion
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4" controlId="formBasicUsername">
                                <Form.Label><FaUserCircle size={20} color="black" /> Usuario</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Ingresa tu usuario"
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Label><TbLockFilled size={20} color="black" /> Contraseña</Form.Label>
                                <Form.Control
                                    type="password" placeholder="Ingresa tu contraseña"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </Form.Group>

                            {loginError && (
                                <Alert variant="danger" className="mt-3">
                                    {loginError}
                                </ Alert>
                            )}
                            <Button variant="warning" type="submit" className="w-100 mt-4">
                                Entrar
                            </Button>
                            <Form.Group className="mb-2 mt-3">
                                <Form.Text className="text-muted">
                                    Eres nuevo? Registrate
                                </Form.Text>
                            </Form.Group>

                            <Button variant="warning" className="w-100 mt-4" onClick={() => irARegistrar()}>
                                Registrarse
                            </Button>
                        </Form>
                    </ Card.Body>
                </Card>
            </Container>
    )

};