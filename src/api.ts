import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // ovde ćemo kasnije zameniti IP da bi radilo i na telefonu
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
