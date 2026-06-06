import axios from "axios";

const API = axios.create({
  // 🛠️ Fixed port number to match your new Express backend
  baseURL: 'http://localhost:5000/api', 
  withCredentials: true 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;