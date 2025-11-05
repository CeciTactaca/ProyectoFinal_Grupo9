import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Error from './pages/Error'
import Proyectos from './pages/Proyectos'
import NoAutorizados from './pages/NoAutorizados'
import Game from './pages/Game'
import ProtectorRutas from './components/ProtectorRutas'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Routes path="/proyectos" element={
          <ProtectorRutas roles={['ADMINISTRATIVO']}>
            <Proyectos />
          </ProtectorRutas>
        } />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="games" element={<Game />} />
        <Route path="unauthorized" element={<NoAutorizados />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default App
