import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <div className="w-100">
      <Navbar/>
      <Routes>
        <Route path="/*" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
