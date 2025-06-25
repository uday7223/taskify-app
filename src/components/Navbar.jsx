import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <nav className="backdrop-blur-xl bg-black/30 text-white shadow-md px-6 py-3 flex justify-between items-center fixed top-0 w-full z-50">
        <Link to="/" className="text-2xl font-semibold tracking-wide hover:text-purple-300 transition">
          Taskify
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-purple-300 transition font-medium">
            Dashboard
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-1 rounded-full font-medium hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 text-zinc-100 rounded-xl p-6 shadow-2xl w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 border rounded-md text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
