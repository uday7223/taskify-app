import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css"
import Login from './pages/Login'
import Register from './pages/Register'
// import CreateTodo from './pages/CreateTodo'
import Navbar from './components/Navbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
// import TodoList from './pages/TodoList'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/create-todo" element={<CreateTodo />} /> */}
        <Route path="/dashboard" element={
           <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          
          } />
        {/* <Route path="/todolist" element={<TodoList/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
