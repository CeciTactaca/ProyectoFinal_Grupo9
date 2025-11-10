import { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

function JuegoColores() {
    const colores = ['#007bff', '#ea0b21ff', '#29a783', '#fffb00ff', '#81bd', '#9ed2ffff', '#a2ff00ff', '#ff8800ff'];
    const [colorDeBotones, setColorDeBotones] = useState(colores.slice(0, 5));
    const [mensaje, setMensaje] = useState('');
    const [contador, setContador] = useState(0);
    const [segundos, setSegundos] = useState(0);


    //useEffect
    useEffect(() => {
        //setMensaje(`Intentos ${contador}`);
        const intervalo = setInterval(() => {
            setSegundos(s => s + 1);
        }, 1000);
        return () => {
            clearInterval(intervalo);
            setSegundos(0);
        }
    }, [contador]);

    const hayColoresRepetidos = (colores) => {
        const contadorColores = {};
        for (let color of colores) {
            contadorColores[color] = (contadorColores[color] || 0) + 1;
            if (contadorColores[color] >= 3) {
                return true;
            }
        }
        return false;
    };

    const manejarClick = () => {
        const coloresNuevos = colorDeBotones.map(() => {
            const indiceAleatorio = Math.floor(Math.random() * colores.length);
            return colores[indiceAleatorio]

        });
        setColorDeBotones(coloresNuevos);
        setContador(contador + 1);

        if (hayColoresRepetidos(coloresNuevos)) {
            setMensaje(`¡Ganaste! Intento N° ${contador + 1}`);
            setContador(0);
        } else {
            setMensaje(`Intento N° ${contador + 1}`);
        }

    };

    return (
        <Stack gap={2} className="col-md-12 mx-auto">
            <div className="grid text-center">
                <h1>Juego de Colores</h1>
                <h6>Presiona cualquier boton para cambiar los colores. Si tres colores coinciden, ganas </h6>
            </div>
            <div className="d-flex gap-1 mb-1">
                {colorDeBotones.map((c, i) => (
                    <Button variant="outline-light"
                        key={i}
                        onClick={manejarClick}
                        style={{ backgroundColor: c }}
                    >
                        Boton {i + 1}
                    </Button>
                ))}
            </div>
            <div className="grid text-center">
                <h2>{mensaje}</h2>
                <h1>{segundos}</h1>
            </div>
        </Stack>
    )
}
export default JuegoColores;