import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
