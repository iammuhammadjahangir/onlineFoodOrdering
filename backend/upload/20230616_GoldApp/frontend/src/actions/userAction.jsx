import { API } from "../api/index.jsx";

export const authFormLogin = async (authFormData) => {
  try {
    const resp = await API.post("/api/admin/signin", authFormData);
    return resp.data;
  } catch (e) {
    // return (e.response.data);
    // alert(e.response.data)
    // alert(e.response.data.message);
    return e.response.data.message;
  }
};
