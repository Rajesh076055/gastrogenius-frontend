
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
        <Routes>
          <Route exact path = "/" element = {<HomePage />} />
          <Route path = "/register-service" element = {<Register />} />
        </Routes>
    </Router>
  );
}

export default App;
