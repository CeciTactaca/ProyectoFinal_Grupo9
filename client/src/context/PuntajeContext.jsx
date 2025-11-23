import { createContext, useState, useMemo, useCallback } from "react";
import { useAutorizacion } from "../hooks/useAutorizacion";
import axios from "axios";

export const PuntajeContext = createContext();

export function PuntajeProvider({ children }) {

    const { userId, setUser, buscarUsuarios } = useAutorizacion();  //El id para guardar el puntaje
    const [puntajes, setPuntajes] = useState({});//los puntajes de cada juego
    const [puntajeTotal, setPuntajeTotal] = useState(0); //puntaje total sumado
    

    //Función para actualizar el puntaje de un juego y el total
    const actualizarPuntaje = useCallback((juego, puntos) => {
        setPuntajes((prev) => {
            const nuevos = { ...prev, [juego]: puntos };
            const total = Object.values(nuevos).reduce((acc, val) => acc + val, 0);
            setPuntajeTotal(total);
            return nuevos;
        });
    }, [puntajes, puntajeTotal]);

    //Función para guardar el puntaje en la base de datos
    const guardarPuntaje = useCallback(async () => {
        if (!userId) return;
        try {
            console.log("entro a guardar", puntajes, puntajeTotal);
            const res = await axios.put(`/api/${userId}/puntaje`,
                { puntajes, puntajeTotal }
            );
            console.log("Puntajes guardados: ", res.data);

            setUser(res.data);
            await buscarUsuarios();
        } catch (error) {
            console.error("Error al cargar puntaje", error);
        }
    }, [userId, puntajes, puntajeTotal]);
    

    // Memoizar el valor del contexto para evitar renders innecesarios
    const valorDelContexto = useMemo(() => ({
        puntajes,
        actualizarPuntaje,
        puntajeTotal,
        guardarPuntaje
    }), [puntajes, actualizarPuntaje, puntajeTotal, guardarPuntaje]);

    return (
        <PuntajeContext.Provider value={valorDelContexto}>
            {children}
        </PuntajeContext.Provider>
    );
}
