import axios from "axios";

export const API = axios.create({
  baseURL: "https://akbackend.softwisesol.com",
  // baseURL: "http://localhost:5000",
  // baseURL: "http://192.168.1.195:5100",
});

// export const ENDPOINT = "http://localhost:5001";
export const ENDPOINT = "https://akbackend.softwisesol.com";
