import axios from "axios";

// Determine the environment (default to "development" if not set)
const env = import.meta.env.VITE_NODE_ENV || "development";

// Set the base URL based on the environment
const BASE_URL =
  env === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_PRODUCTION_URL;

const API = axios.create({ baseURL: BASE_URL });

// Automatically attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
