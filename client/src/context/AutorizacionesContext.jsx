import { createContext, useState, useMemo, useCallback } from "react";
import usuarioGuardado from '../assets/data/usuarios.json'

// Crear el contexto
export const AutorizacionesContext = createContext(null);

//Componente proveedor del contexto de autenticacion 
export function AutorizacionesProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = useCallback((credencial) => {
        try {
            const usuarioEncontrado = usuarioGuardado.find(
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
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const valorDelContexto = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        login,
        logout,
    }), [user, login, logout]);

    //proveer el valor del contexto a los hijos
    return (
        <AutorizacionesContext.Provider value={valorDelContexto}>
            {children}
        </AutorizacionesContext.Provider>
    );
}