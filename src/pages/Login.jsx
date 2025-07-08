import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff  } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");
  try {

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);
    

    const response = await API.post("/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const token = response.data.access_token;
    localStorage.setItem("token", token);
    setSuccess("Login successful!");
    navigate("/dashboard"); // Redirect to dashboard or another page after successful login
  } catch (error) {
    setErrorMsg("Invalid credentials.");
  }
};

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 px-4 dark:bg-[#121212]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl dark:bg-[#1e1e1e]">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <button
                          type="button"
                          className="absolute top-3.5 right-3 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>

          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300"
          >
            Login
          </button>
        </form>


        <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">
          New to Taskify? 

          <Link to="/register" className="text-indigo-500 ms-1 hover:underline">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
}
