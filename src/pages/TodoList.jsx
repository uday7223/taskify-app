import { useEffect, useState } from "react";
import axios from "../services/api";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const markComplete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`/todos/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos(); // refresh list
    } catch (err) {
      console.error("Error marking complete:", err);
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos(); // refresh list
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Your Tasks
      </h1>

      <div className="space-y-4 max-w-2xl mx-auto">
        {todos.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No tasks found. Add one!
          </p>
        )}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center justify-between p-4 rounded-xl shadow-sm ${
              todo.completed
                ? "bg-green-100 dark:bg-green-800"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {todo.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Due: {todo.date}
              </p>
            </div>

            <div className="flex gap-3">
              {!todo.completed && (
                <button
                  onClick={() => markComplete(todo.id)}
                  className="text-green-600 hover:text-green-800 transition"
                  title="Mark Complete"
                >
                  <FiCheckCircle size={20} />
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
