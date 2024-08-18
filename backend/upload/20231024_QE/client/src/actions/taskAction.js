import axios from "axios";
import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
  POST_TASK_REQUEST,
  POST_TASK_SUCCESS,
  POST_TASK_FAIL,
} from "../constants/taskConstants";

export const getTask = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_REQUEST });
    const { data } = await axios.get("/api/task/get");
    console.log(data)
    dispatch({
      type: TASK_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload: error.response,
    });
  }
};
export const postTask = (values) => async (dispatch) => {
  try {
    dispatch({ type: POST_TASK_REQUEST });
    console.log(values)
    const { data } = await axios.post("/api/task/post", values);
    dispatch({
      type: POST_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_TASK_FAIL,
      payload: error.response,
    });
  }
};
