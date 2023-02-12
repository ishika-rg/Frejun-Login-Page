import './App.css';
import Login from './pages/login/Login';
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/users/Dashboard';



function App() {
  return (
    <div className="App">

      <Routes>
        <Route path = '/' exact  element = {<Login />}  />
        <Route path ='/dashboard' element = {<Dashboard />}  />
      </Routes>
    </div>
  );
}

export default App;
