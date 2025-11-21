import { createContext, useState, useMemo, useCallback } from "react";
import { useAutorizacion } from "../hooks/useAutorizacion";
import axios from "axios";

export const PuntajeContext = createContext();

export function PuntajeProvider({ children }) {

    const { userId } = useAutorizacion();  //El id para guardar el puntaje
    const [puntajes, setPuntajes] = useState({});//los puntajes de cada juego
    const [puntajeTotal, setPuntajeTotal] = useState(0); //puntaje total sumado

    const actualizarPuntaje = useCallback((juego, puntos) => {
        setPuntajes((prev) => {
            const nuevos = { ...prev, [juego]: puntos };
            const total = Object.values(nuevos).reduce((acc, val) => acc + val, 0);
            setPuntajeTotal(total);
            return nuevos;
        });
    }, [puntajes, puntajeTotal]);


    const guardarPuntaje = useCallback(async () => {
        if (!userId) return;
        try {
            const res = await axios.put(`/api/${userId}/puntaje`,
                { puntajes, puntajeTotal }
            );
            console.log("Puntajes guardados: ", res.data);
        } catch (error) {
            console.error("Error al cargar puntaje", error);
        }
    }, [userId, puntajes, puntajeTotal]);

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
