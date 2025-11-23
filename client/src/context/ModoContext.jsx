import { createContext, useContext, useState, useEffect } from 'react';

export const ModoContext = createContext();

export const ModoProvider = ({ children }) => {
  
  const initialModo = localStorage.getItem('modo') === 'dark' ? 'dark' : 'light';
  const [modo, setModo] = useState(initialModo);
  
  // Guarda el modo en el localStorage cuando cambia
   useEffect(() => {
    localStorage.setItem('modo', modo);
  }, [modo]);
  
  // Función para alternar entre modos
  const toggleModo = () => {
    setModo(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ModoContext.Provider value={{ modo, toggleModo }}>
      <div data-bs-theme={modo}>
        {children}
      </div>
    </ModoContext.Provider>
  );
};