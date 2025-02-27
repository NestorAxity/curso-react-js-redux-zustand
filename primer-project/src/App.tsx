import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home'
import './App.css'

function App() {

  return (
    <main>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App