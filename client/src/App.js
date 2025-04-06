import logo from './logo.svg';
import './App.css';
import Input from './sapp';
import Soc from './so';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Input/>}/>
        <Route path="/sock" element={<Soc/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
