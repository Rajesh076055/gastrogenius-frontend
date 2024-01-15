
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Session from './Pages/Session';
import { SocketProvider } from './Contexts/AppContext';
import { CanvasSizeProvider } from './Contexts/AppContext';
import { NameProvider } from './Contexts/AppContext';
import io from 'socket.io-client';

function App() {
  const socket_with_ai = io('http://192.168.1.69:8000');
  
  socket_with_ai.emit("connects")

  return (
    <SocketProvider value = {socket_with_ai}>
      <CanvasSizeProvider>
        <NameProvider>
          <Router>
            <Routes>
              <Route exact path = "/" element = {<HomePage />} />
              <Route path = "/register-service" element = {<Register />} />
              <Route path = "/session/" element = {<Session/>} />
            </Routes>
          </Router>
        </NameProvider>
      </CanvasSizeProvider>
    </SocketProvider>
   
  );
}

export default App;
