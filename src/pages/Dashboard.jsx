import React, { useState } from "react";
import CreateTodo from "../pages/CreateTodo";
import TodoList from "../pages/TodoList";
import API from "../services/api";


export default function Dashboard() {

    const [todos, setTodos] = useState([]);
  
    const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await API.get("/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };
  return (
    <div className="p-1 mt-10 md:p-8 py-6 bg-gray-950 min-h-screen ">
      <div className="flex flex-col md:flex-row gap-2">
        {/* CreateTodo Form */}
        <div className="w-full md:w-1/3 shadow-lg rounded-2xl p-6 bg-white dark:bg-gray-800">
          <CreateTodo fetchTodos={fetchTodos}/>
        </div>

        {/* Todo List */}
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <TodoList fetchTodos={fetchTodos} todos={todos}/>
        </div>
      </div>
    </div>
  );
}
