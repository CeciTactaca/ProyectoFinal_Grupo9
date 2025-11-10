import musica from '../assets/sounds/pou.mp3';
import { useNavigate } from 'react-router-dom';
import FormJuegos from '../components/Proyecto5/FormJuegos';
import { Button, Container } from 'react-bootstrap';
import JuegoEstrellas from '../components/Proyecto5/Juegoestrellas';

function Games() {

  const navegacion = useNavigate();

  const ejecutarSonido = () => {
    const audio = new Audio(musica);
    audio.play()
  }
  const manejarClick = () => {
    ejecutarSonido()
    navegacion("/")
  };

  return (
    <Container className='mt-5 mb-5'>
      <div>
        <Button variant="warning" onClick={manejarClick}>Escuchar Musica</Button>
        <h1>Cargar Juegos</h1>
        <FormJuegos />
      </div>
      <div style={{ marginTop: '15px' }}>
        <JuegoEstrellas />
      </div>

    </Container>
  )
};

export default Games;