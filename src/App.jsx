import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Error from './pages/Error'

function App() {
  
  return (
   <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App
