
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Header from './components/Navbar/Header'
import Login from './pages/Login'
function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/register'element={<Register/>}/>
        <Route path='/'element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
