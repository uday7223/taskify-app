import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        "https://fastapi-todo-backend-production.up.railway.app/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(res.data);
    } catch (err) {
      toast.error("Failed to fetch todos");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.put(
        `https://fastapi-todo-backend-production.up.railway.app/todos/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Marked as completed");
      fetchTodos();
    } catch (err) {
      toast.error("Could not update task");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://fastapi-todo-backend-production.up.railway.app/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Todo deleted");
      fetchTodos();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Todos</h2>

      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos found.</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white/20 backdrop-blur-sm border border-white/30 p-4 rounded-xl shadow-md"
            >
              <div>
                <h3 className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-400" : ""}`}>
                  {todo.title}
                </h3>
                <p className="text-sm text-gray-300">Date: {todo.date}</p>
              </div>

              <div className="flex gap-3 items-center">
                {!todo.completed && (
                  <button
                    onClick={() => markComplete(todo.id)}
                    className="text-green-500 hover:text-green-700"
                    title="Mark as complete"
                  >
                    <FiCheckCircle size={20} />
                  </button>
                )}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
