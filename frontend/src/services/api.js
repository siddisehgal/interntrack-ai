import axios from "axios";

// Set VITE_API_URL in your .env (frontend) for production.
// Falls back to localhost:8000 for local development.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

// If the backend says the token is invalid/expired, clear it and bounce to login
// instead of leaving the user stuck on a broken authenticated-looking page.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("access_token");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
