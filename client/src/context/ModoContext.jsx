import { createContext, useContext, useState, useEffect } from 'react';

export const ModoContext = createContext();

export const ModoProvider = ({ children }) => {
  
  const initialModo = localStorage.getItem('modo') === 'dark' ? 'dark' : 'light';
  const [modo, setModo] = useState(initialModo);

  // useEffect para saber si tiene un tema y guardarlo
  useEffect(() => {
    const savedModo = localStorage.getItem('modo');
    if (savedModo === 'light' || savedModo === 'dark') {
      setModo(savedModo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('modo', modo);
  }, [modo]);

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