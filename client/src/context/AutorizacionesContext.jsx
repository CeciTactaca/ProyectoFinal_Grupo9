import { createContext, useState, useMemo, useCallback } from "react";
//import usuarioGuardado from '../assets/data/usuarios.json'
import { useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const AutorizacionesContext = createContext(null);

//Componente proveedor del contexto de autenticacion 
export function AutorizacionesProvider({ children }) {
    const [usuariosBD, setUsuariosBD] = useState([]);
    //const [user, setUser] = useState(null);

    const[user, setUser] = useState(() =>{
        try{
            const storedUser = localStorage.getItem('LOCAL_STORAGE_KEY')
            return storedUser ? JSON.parse(storedUser) : null;
        } catch(error){
            localStorage.removeItem('LOCAL_STORAGE_KEY');
            return null;
        }
    });

    const buscarUsuarios = useCallback(async () => {
        try{
            const res = await axios.get('/api/obtenerUsuario');
            setUsuariosBD(res.data); 
            console.log("usuarios cargados:", res.data);
        } catch (err) {
            console.error("Error al cargar jugadores:", err);
        }
    }, []);

    const login = useCallback((credencial) => {
        console.log(usuariosBD);
        try {
            const usuarioEncontrado = usuariosBD.find(
                u => u.username === credencial.username && u.password === credencial.password
            );

            if (usuarioEncontrado) {
                const { password, ...userWithoutPassword } = usuarioEncontrado; //Quitamos la password
                setUser(userWithoutPassword);
                return { success: true }; //retorna verdadero inmediatamente
            } else {
                //si no se encuentra el usuario o las credenciales no coinciden
                setUser(null)
                //retorna un objeto de error
                return { success: false, message: 'Credenciales invalidas. Por favor verifique su usuario y contraseña' }
            }
        } catch (error) {
            //errores inesperados en el find
            console.error("Login failed: ", error.message);
            setUser(null)
            return { success: false, message: 'Ocurrio un error inesperado durante el login' };
        }
    }, [usuariosBD]);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    useEffect(() =>{
        if(user){
            //si user tiene un valor (despues del login), lo guarda
            localStorage.setItem('LOCAL_STORAGE_KEY', JSON.stringify(user));
        } else {
            //si user es null (despues del logout)
            localStorage.removeItem('LOCAL_STORAGE_KEY');
        }
    }, [user]);

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const valorDelContexto = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        login,
        logout,
        usuariosBD
    }), [user, login, logout, usuariosBD]);

    //proveer el valor del contexto a los hijos
    return (
        <AutorizacionesContext.Provider value={valorDelContexto}>
            {children}
        </AutorizacionesContext.Provider>
    );
}