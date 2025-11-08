import { Navigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion";

const ProtectorRutas = ({ roles, children }) => {
    const { isAuthenticated, user } = useAutorizacion();

    //si no esta autenticado se redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    //si esta autenticado, se verifica el rol 
    if (roles && !roles.includes(user?.rol)) {
        return <Navigate to="/unauthorized" replace />
    }

    //si esta autorizado y autenticado por el rol, renderizar el componente hijo
    return children;
};

export default ProtectorRutas;