import axios from "axios";

const API = axios.create({
  baseURL: "https://fastapi-todo-backend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
