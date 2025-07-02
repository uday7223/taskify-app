// src/pages/Register.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import API from "../services/api"
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await API.post("/register", {
      username,
      email,
      password,
    });

    console.log("Registered user:", response.data);
    // ✅ Redirect or show success message
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.detail || "Registration failed");
  } finally {
    // Clear form fields after submission
    setUsername("");
    setEmail("");
    setPassword("");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9}}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create your account
        </h2>
        <form className="space-y-5">
          {/* Name */}
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

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg"
            onClick={handleRegister}
          >
            Register
          </motion.button>
        </form>

        {/* Toggle Dark Mode Hint */}
        <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">
          Already have an account? <Link to="/" className="text-indigo-500 ms-1 hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
