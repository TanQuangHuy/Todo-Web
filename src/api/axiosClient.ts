// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://fake-api.todo.app",
  timeout: 1000,
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export default axiosClient;
