import { useState } from "react";
import { FiCalendar, FiFileText } from "react-icons/fi";
import axios from "../services/api"; // use pre-configured axios instance
import { useNavigate } from "react-router-dom";

export default function CreateTodo({fetchTodos}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  // const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("/todos", { title, date }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos(); // refresh todo list
      alert("Todo created successfully!");
      // navigate("/"); // redirect if needed
    } catch (err) {
      console.error(err);
      alert("Failed to create todo");
    }finally{
      setTitle("");
      setDate("");  
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg  shadow-indigo-300 rounded-2xl p-5 w-full  space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
          Create a Todo
        </h2>

        <div className="relative">
          <FiFileText className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Title"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <FiCalendar className="absolute top-3 left-3 text-gray-400" />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
