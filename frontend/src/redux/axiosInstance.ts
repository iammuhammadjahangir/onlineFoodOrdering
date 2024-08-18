import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
});
export default axiosInstance;

export const ENDPOINT = import.meta.env.VITE_SERVER;
