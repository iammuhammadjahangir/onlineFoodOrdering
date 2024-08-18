import axios from "axios";
import {
  ALL_COLOR_DELETE_FAIL,
  ALL_COLOR_DELETE_REQUEST,
  ALL_COLOR_DELETE_SUCCESS,
  ALL_COLOR_DETAILS_FAIL,
  ALL_COLOR_DETAILS_REQUEST,
  ALL_COLOR_DETAILS_SUCCESS,
  ALL_COLOR_FAIL,
  ALL_COLOR_POST_FAIL,
  ALL_COLOR_POST_REQUEST,
  ALL_COLOR_POST_SUCCESS,
  ALL_COLOR_REQUEST,
  ALL_COLOR_SUCCESS,
  ALL_COLOR_UPDATE_FAIL,
  ALL_COLOR_UPDATE_REQUEST,
  ALL_COLOR_UPDATE_SUCCESS,
} from "../constants/colorConstants";
import API from "./baseURL";
export const getColor = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COLOR_REQUEST });
    const { data } = await axios.get("/api/color/get");
    dispatch({
      type: ALL_COLOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COLOR_FAIL,
      payload: error.response,
    });
  }
};

export const getColorr = async () => {
  try {
    const { data } = await axios.get("/api/color/get");
    return data;
  } catch (error) {
    console.log("chie");
  }
};

export const getColorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COLOR_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/color/get/${id}`);
    dispatch({
      type: ALL_COLOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COLOR_DETAILS_FAIL,
      payload: error.response,
    });
  }
};

export const postColor = async (colorName, colorDescription) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/color/post`,
      {
        colorName,
        colorDescription,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const updateColor = async (id, colorName, colorDescription) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/color/put/${id}`,
      {
        colorName,
        colorDescription,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteColor = async (id) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(`/api/color/delete/${id}`);
    return data;
  } catch (error) {
    return error.response;
    console.log(error.response);
  }
};
