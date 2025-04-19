import logo from './logo.svg';
import './App.css';
import Input from './sapp';
import Sh from './so';
import Ff from './cam';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Input/>}/>
        <Route path="/sock" element={<Sh/>}/>
        <Route path="/cam" element={<Ff/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
