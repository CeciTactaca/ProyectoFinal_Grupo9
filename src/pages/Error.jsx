import { Link } from "react-router-dom";

function Error() {

    return(
        <>
        <h1>Error al cargar la Pagina</h1>
        <h1> <Link to="/"> Volver al HOME </Link></h1>
        </>
    )
};

export default Error;