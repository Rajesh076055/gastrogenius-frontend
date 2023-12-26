
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Session from './Pages/Session';
import { SocketProvider } from './Contexts/SocketContext';
import io from 'socket.io-client';

function App() {

  const socket_with_ai = io('http://localhost:8000');
  
  return (
    <SocketProvider value = {socket_with_ai}>
      <Router>
        <Routes>
          <Route exact path = "/" element = {<HomePage />} />
          <Route path = "/register-service" element = {<Register />} />
          <Route path = "/session" element = {<Session/>} />
        </Routes>
      </Router>
    </SocketProvider>
   
  );
}

export default App;
