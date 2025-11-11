import { useState, useMemo } from "react";
import { Button, Row, Col } from "react-bootstrap";

export const BuscarJuego = ({ juegos }) => {
    const [ingreso, setIngreso] = useState(0);
    const [busqueda, setBusqueda] = useState(false);

    const ingresar = (e) => {
        setBusqueda(false)
        setIngreso(parseInt(e.target.value));
    };

    const handleClick = () => {
        setBusqueda(true)
    }

    const resultado = useMemo(() => {
        const newArray = juegos.filter((producto) => producto.id === ingreso);
        return newArray;
    }, [juegos, ingreso]);

    return (
        <>
            <h2>Buscar Juegos</h2>
            <input
                onChange={ingresar}
                placeholder="Ingrese ID del juego"
                type="number"
            />
            <Row>
                <Col className="mt-2">
                    <Button variant="warning" OnClick={handleClick}>Buscar</Button>
                </Col >
            </Row>

            {busqueda && resultado.length > 0
                ? <div>
                    ID: {resultado[0].id} -
                    Nombre del producto: {resultado[0].nombre} -
                    Precio: {resultado[0].precio} -
                    Tipo: {resultado[0].tipo} -
                    Estado: {resultado[0].estado} -
                </div>
                : (busqueda && <h2>El juego ingresado ha sido encontrado</h2>)
            }
        </>
    )
}