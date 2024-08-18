import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_FAIL,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  FORGOTPASSWORD_REQUEST,
  FORGOTPASSWORD_SUCCESS,
  FORGOTPASSWORD_FAIL,
} from "../constants/userConstants";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "./baseURL";
export const login = async (username, password) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.post(
      `/api/auth/post/login`,
      { username, password },
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await API.post(`/api/auth/post/login`, {
      username,
      password,
    });
    console.log(data);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: LOGIN_FAIL, payload: error.response });
  }
};
///////////////For Users///////////////////
export const getUsers = async () => {
  try {
    const { data } = await API.get("/api/user/getWithPopulation");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneUserByUserName = async (id) => {
  try {
    const { data } = await API.get(`/api/user/getOneUserByUserName/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVerifiedUserMessage = async (usernameparams, password) => {
  // console.log(usernameparams, password);
  try {
    console.log(usernameparams);
    console.log(password);
    const { data } = await API.get(
      `/api/user/getVerifiedUser/${usernameparams}/${password}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPassword = async (username, password) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.put(`/api/user/updateUserPassword/${username}`, {
      password,
    });
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const updatePrinterStatusId = async (id, printerId) => {
  try {
    console.log(id);
    console.log(printerId);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.put(`/api/user/updatePrinterId/${id}`, {
      printerId,
    });
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const resetPasswordToken = async (token, password, confirmPassword) => {
  try {
    console.log(token);
    console.log(password);
    console.log(confirmPassword);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.put(`/api/auth/password/reset/${token}`, {
      password,
      confirmPassword,
    });
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const getUsersById = async (id) => {
  try {
    console.log(id);
    const { data } = await API.get(`/api/user/getWithPopulationWithId/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOldUser = async (
  id,
  name,
  username,
  rolesNonArray,
  active,
  shopNo,
  posId,
  password,
  phoneNo,
  whatsappNo
) => {
  try {
    const roles = rolesNonArray.split(",");
    console.log(roles);
    console.log(id);
    console.log(name);
    console.log(username);
    console.log(rolesNonArray);
    console.log(active);
    console.log(shopNo);
    console.log(posId);
    console.log(password);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.put(`/api/user/put/${id}`, {
      id,
      name,
      username,
      roles,
      active,
      password,
      shopNo,
      posId,
      phoneNo,
      whatsappNo,
    });
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await API.get(`/api/user/me`);
    console.log(data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response });
  }
};

export const getLoadUser = async () => {
  try {
    const { data } = await API.get(`/api/user/me`);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const refreshTokken = async () => {
  // const navigate = useNavigate()
  try {
    //  dispatch({type: TOKEN_REFRESH_REQUEST})

    const { data } = await API.get(`/api/user/refreshToken`);
    console.log(data.data);
    return data;
    //  dispatch({type: TOKEN_REFRESH_SUCCESS})
  } catch (error) {
    console.log(error?.response);
    return error.response;
  }
};

export const postNewUser = async (
  name,
  username,
  password,
  roles,
  shopNo,
  email,
  posId,
  phoneNo,
  whatsappNo
) => {
  try {
    // const roles = rolesNonArray.split(",");
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.post("/api/user/post", {
      name,
      username,
      password,
      roles,
      shopNo,
      email,
      // godownNo,
      posId,
      phoneNo,
      whatsappNo,
    });
    // console.log(data)
    return data;
  } catch (error) {}
};

export const forgotPasswordSendEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOTPASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await API.post(`/api/auth/password/forgot`, { email });
    console.log(data);
    dispatch({ type: FORGOTPASSWORD_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FORGOTPASSWORD_FAIL, payload: error.response });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.post("/api/auth/logout");
    // console.log(data)
    // return data;
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL });
  }
};

export const updateTableRowsId = async (id, tableId) => {
  try {
    console.log(id);
    console.log(tableId);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/user/updateTableRowId/${id}`, {
      tableId,
    });
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
