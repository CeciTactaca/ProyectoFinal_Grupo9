import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Error from './pages/Error'
import ProtectorRutas from './components/ProtectorRutas'
import Proyecto5 from './pages/Proyecto5'
import NoAutorizados from './pages/NoAutorizados'
import Game from './pages/Game'
import Proyecto4 from './pages/Proyecto4'
import Proyecto3 from './pages/Proyecto3'
import Proyecto2 from './pages/Proyecto2'
import Ejercicio1 from './components/Proyecto2/Ejercicio1.jsx';
import Ejercicio2 from './components/Proyecto2/Ejercicio2.jsx';
import Ejercicio3 from './components/Proyecto2/Ejercicio3.jsx';
import Ejercicio4 from './components/Proyecto2/Ejercicio4.jsx';
import Ejercicio5 from './components/Proyecto2/Ejercicio5.jsx';

import Registrar from './components/Registrar'


function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/proyecto5" element={<Proyecto5 />} />
        <Route path="/proyecto4" element={<Proyecto4 />} />
        <Route path="/proyecto3" element={<Proyecto3 />} />
        <Route path="/proyecto2" element={<Proyecto2 />} />
        <Route path="/ejercicio1" element={<Ejercicio1 />} />
        <Route path="/ejercicio2" element={<Ejercicio2 />} />
        <Route path="/ejercicio3" element={<Ejercicio3 />} />
        <Route path="/ejercicio4" element={<Ejercicio4 />} />
        <Route path="/ejercicio5" element={<Ejercicio5 />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path="/games" element={<ProtectorRutas roles={['ALUMNO']}>
          <Game />
        </ProtectorRutas>} />
        <Route path="*" element={<Error />} />
        <Route path="/unauthorized" element={<NoAutorizados />} />
      </Route>
    </Routes>
  )
}

export default App
