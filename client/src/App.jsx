import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Error from './pages/Error'
import ProtectorRutas from './components/ProtectorRutas'
import Proyectos from './pages/Proyectos'
import NoAutorizados from './pages/NoAutorizados'
import Game from './pages/Game'
import Registrar from './components/Registrar'


function App() {


  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/proyectos" element={
            <ProtectorRutas roles={['ADMINISTRATIVO']}>
              <Proyectos />
            </ProtectorRutas>
          } />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path='/registrar' element={<Registrar />} />
          <Route path="/games" element={<Game />} />
          <Route path="*" element={<Error />} />
          <Route path="/unauthorized" element={<NoAutorizados />} />
          
        </Route>
      </Routes>
  )
}

export default App
