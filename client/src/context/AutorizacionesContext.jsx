import { createContext, useState, useMemo, useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const AutorizacionesContext = createContext(null);

//Componente proveedor del contexto de autenticacion 
export function AutorizacionesProvider({ children }) {
    const [usuariosBD, setUsuariosBD] = useState([]);

    const[user, setUser] = useState(() =>{
        try{
            const storedUser = localStorage.getItem('LOCAL_STORAGE_KEY')
            return storedUser ? JSON.parse(storedUser) : null;
        } catch(error){
            localStorage.removeItem('LOCAL_STORAGE_KEY');
            return null;
        }
    });
    

    //Funcion para buscar los usuarios en la base de datos
    const buscarUsuarios = useCallback(async () => {
        try{
            const res = await axios.get('/api/obtenerUsuario');
            setUsuariosBD(res.data); 
            console.log("usuarios cargados:", res.data);
        } catch (err) {
            console.error("Error al cargar jugadores:", err);
        }
    }, []);
    
    //Funcion para loguear al usuario
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
    
    //Funcion para desloguear al usuario
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
        userNombre: user ? user.nombre : null,
        userId: user ? user._id : null,
        userPuntajes: user ? user.puntajes : null,
        userTotal: user ? user.puntajeTotal : null,
        isAuthenticated: !!user,
        login,
        logout,
        usuariosBD,
        buscarUsuarios,
        setUser
    }), [user, setUser, login, logout, usuariosBD, buscarUsuarios]);

    //proveer el valor del contexto a los hijos
    return (
        <AutorizacionesContext.Provider value={valorDelContexto}>
            {children}
        </AutorizacionesContext.Provider>
    );
}