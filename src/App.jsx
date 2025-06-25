
import './App.css'
import {BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Resgister/Register'
import Dashboard from './Pages/DashBoard/Dashboard'
import Abc from './Pages/Abc.jsx'

const App = () =>{
  return(
<Router>
  <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/dashboard' element={<Dashboard />}/>
    <Route path='/das' element={<Abc />}/>
  </Routes>
</Router>
)
}
export default App
