import { useContext } from "react";
import { ModoContext } from "../context/ModoContext";

export const useModo = () => {
  const context = useContext(ModoContext);
  if (!context) throw new Error('useModo debe usarse dentro de ModoProvider');
  return context;
};