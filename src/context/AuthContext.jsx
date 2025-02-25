// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react"; // Add useContext here
import API from "../utils/api.jsx";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Check if the user is already logged in (on page load)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(data)); // Store user in localStorage
      localStorage.setItem("token", data.token); // Store token
      setUser(data); // Update user state
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      const { data } = await API.post("/auth/register", { email, password });
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
