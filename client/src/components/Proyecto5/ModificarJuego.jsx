import { useState } from "react";
import { Button } from "react-bootstrap";

export const ModificarJuego = ({ juego, funcion_modificar }) => {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState(0)
    const [tipo, setTipo] = useState("")
    const [estado, setEstado] = useState("")

    const cambiarNombre = (event) => { setNombre(event.target.value) }
    const cambiarPrecio = (event) => { setPrecio(event.target.value) }
    const cambiarTipo = (event) => { setTipo(event.target.value) }
    const cambiarEstado = (event) => { setEstado(event.target.value) }

    const product_mod = {
        id: juego.id,
        nombre: nombre === "" ? juego.nombre : nombre,
        precio: precio === 0 ? juego.precio : precio,
        tipo: tipo === "" ? juego.tipo : tipo,
        estado: estado === "" ? juego.estado : estado,
        modificado: true
    }

    return (
        <>
            <div>
                ID= {juego.id}
                Nombre = <input placeholder={juego.nombre} type="text" onChange={cambiarNombre} /> -
                Precio = <input placeholder={juego.precio} type="numbre" onChange={cambiarPrecio} /> -
                Tipo = <input placeholder={juego.tipo} type="text" onChange={cambiarTipo} /> -
                Estado = <input placeholder={juego.estado.toString()} type="text" onChange={cambiarEstado} />

                <Button className="mt-2" variant="warning" onClick={() => funcion_modificar(product_mod)}>Guardar</Button>
            </div>
        </>
    )
}