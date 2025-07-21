import { useEffect, useState } from "react";
import API from "../services/api";
import { FiCheckCircle, FiTrash2, FiRepeat } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function TodoList({ fetchTodos, todos }) {
  const [showDeleteModal, setShowDeleteModal] = useState();
  // const [todos, setTodos] = useState([]);

  // const fetchTodos = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const res = await axios.get("/todos", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setTodos(res.data);
  //   } catch (err) {
  //     console.error("Error fetching todos:", err);
  //   }
  // };

  const markComplete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await API.put(
        `/todos/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos(); // refresh list
    } catch (err) {
      console.error("Error marking complete:", err);
    }
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await API.delete(`/todos/${id}`, {
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
    <div className=" bg-gray-100 dark:bg-gray-900 p-6 rounded-2xl shadow-lg shadow-teal-300">
      <h1 className="text-3xl font-bold text-center  text-gray-800 dark:text-white mb-6 mt-5">
        Your Tasks
      </h1>

      <div className="h-[500px] xl:h-[610px] overflow-y-auto  space-y-4 max-w-4xl  mx-auto pe-2">
        {todos.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No tasks found. Add one!
          </p>
        )}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className={` flex items-center justify-between p-4 rounded-2xl shadow-sm ${
              todo.completed
                ? "bg-green-100 dark:bg-green-800"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            <div className="">
              <h2
                className={`text-lg font-semibold text-gray-800 dark:text-white break-words max-w-[200px] sm:max-w-none  sm:whitespace-normal ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.title}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-300">
                Due: {todo.date}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => markComplete(todo.id)}
                title="Mark Complete"
              >
                {todo.completed ? (
                  <FiRepeat
                    size={20}
                    className="text-black hover:text-gray-800 active:text-white transition"
                  />
                ) : (
                  <FiCheckCircle
                    size={20}
                    className="text-green-500 hover:text-green-700 transition active:text-white"
                  />
                )}
              </button>
              <button
                onClick={() => setShowDeleteModal(todo.id)}
                className="text-red-500 relative hover:text-red-700 transition"
                title="Delete"
              >
                <FiTrash2 size={20} />
              </button>

             
            </div>
             {showDeleteModal === todo.id && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl max-w-xs">
                    <h2 className="text-lg text-center font-semibold mx-5 mb-5 text-gray-800 dark:text-white">
                      Confirm Delete
                    </h2>
                    <div className="flex justify-center gap-5 text-white">
                      <button
                        onClick={() => {
                          setShowDeleteModal(null);
                          deleteTodo(todo.id);
                        }}

                        className="flex align-middle"
                      >Yes
                        <FaCheckCircle className="text-green-500  ms-2 hover:text-green-600 transition" size={20} />
                      </button>
                      <button  onClick={() => setShowDeleteModal(null)} className="flex align-middle">No
                        <MdCancel className="text-red-500 ms-2  hover:text-red-600 transition" size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
