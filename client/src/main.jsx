import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AutorizacionesProvider } from './context/AutorizacionesContext.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ModoProvider } from './context/ModoContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModoProvider>
      <AutorizacionesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AutorizacionesProvider>
    </ModoProvider>
  </StrictMode>
)
