import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Enter from './pages/Enter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Enter/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
    </div>
  );
}

export default App;