import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css"
import Login from './pages/Login'
import Register from './pages/Register'
import CreateTodo from './pages/CreateTodo'
import Navbar from './components/Navbar'
// import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-todo" element={<CreateTodo />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
