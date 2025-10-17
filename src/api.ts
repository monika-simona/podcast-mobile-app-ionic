import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true, // za Sanctum autentifikaciju
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // čuvamo token u localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token poslat:", token);
  }
  return config;
});

export default api;
