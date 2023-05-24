import './App.css';
import { Routes, Route } from "react-router-dom"
import Protected from './components/Protected'
import AntiProtected from './components/AntiProtected';
import Home from './pages/Home';
import Enter from './pages/Enter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import Chat from './pages/Chat';
import Draw from './pages/Draw';
import { Toaster } from 'react-hot-toast';
import Templated from './components/Templated';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Enter/> } />
        <Route path="/login" element={ <AntiProtected><Login/></AntiProtected> } />
        <Route path="/signup" element={ <AntiProtected><Signup/></AntiProtected> } />
        <Route path="/home" element={ <Protected><Templated><Home/></Templated></Protected> } />
        <Route path="/chat" element={ <Protected><Templated><Chat/></Templated></Protected> } />
        <Route path="/draw" element={ <Protected><Templated><Draw/></Templated></Protected> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
      <div><Toaster position='bottom-right'/></div>
    </div>
  );
}

export default App;