import './App.css';
import { Routes, Route } from "react-router-dom"
import Protected from './components/Protected'
import AntiProtected from './components/AntiProtected';
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
        <Route path="/login" element={ <AntiProtected><Login/></AntiProtected> } />
        <Route path="/signup" element={ <AntiProtected><Signup/></AntiProtected> } />
        <Route path="/home" element={ <Protected><Home/></Protected> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
    </div>
  );
}

export default App;