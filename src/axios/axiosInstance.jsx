// api.js
import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
 
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error making request:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
  
    return response;
  },
  (error) => {
    console.error("Error response from server:", error);
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default instance;
