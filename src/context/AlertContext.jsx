// src/context/AlertContext.jsx
import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const showAlert = (message, type = "success") => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert({ message: "", type: "", visible: false });
    }, 3000); // auto-hide in 3 sec
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white text-sm transition-all duration-300 ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  );
};
