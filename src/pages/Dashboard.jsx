import React, { useState } from "react";
import CreateTodo from "../pages/CreateTodo";
import TodoList from "../pages/TodoList";
import axios from "../services/api";


export default function Dashboard() {

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
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        {/* CreateTodo Form */}
        <div className="md:w-1/2 w-full">
          <CreateTodo fetchTodos={fetchTodos}/>
        </div>

        {/* Todo List */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
          <TodoList fetchTodos={fetchTodos} todos={todos}/>
        </div>
      </div>
    </div>
  );
}
