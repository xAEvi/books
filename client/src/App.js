import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Books from './components/Books';
import Add from './components/Add';
import Update from './components/Update';
import './style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Books/>}></Route>
          <Route  path='/add' element={<Add/>}></Route>
          <Route  path='/update/:id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
