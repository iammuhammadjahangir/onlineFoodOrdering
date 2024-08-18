import axios from "axios";

export default axios.create({
  baseURL: "https://akbackend.softwisesol.com",
  // baseURL: "http://localhost:5070",
  headers: {
    "Content-type": "application/json",
  },
});
