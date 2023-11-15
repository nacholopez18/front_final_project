import axios from "axios";

const api = axios.create({
  baseURL: "https://final-back-project.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
