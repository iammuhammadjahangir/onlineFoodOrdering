import { frontEndAuthAPI } from "./api";

export const Auth = async () => {
  try {
    const data = localStorage.getItem("userToken");

    const jwt = JSON.parse(data);
    console.log(jwt);
    const obj = {
      data1: jwt,
    };
    const result = await frontEndAuthAPI(obj);

    console.log(result);
    return result;
  } catch (e) {
    return e.response.data;
  }
};
