import axios from "axios";

const API = axios.create({
  // baseURL: "https://fastapi-todo-backend-production.up.railway.app",

  // for local testing
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API; 
