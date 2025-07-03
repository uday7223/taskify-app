// src/pages/Register.jsx
import { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const { showAlert } = useAlert();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/register", {
        username,
        email,
        password,
      });

      // navigate("/");
      if (response.status === 201) {
        showAlert("Registration successful", "success");
        navigate("/");
      }
    } catch (err) {
      showAlert( `${err.response?.data?.detail}`, "error");
      setError(err.response?.data?.detail || "Registration failed");

    } finally {
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create your account
        </h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Username */}
          <div className="relative">
            <FiUser className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="pl-10 w-full py-2 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 w-full py-2 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-10 w-full py-2 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-3.5 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Redirect link */}
        <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-500 ms-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
