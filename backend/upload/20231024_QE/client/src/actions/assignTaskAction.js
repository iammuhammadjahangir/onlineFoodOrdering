import axios from "axios";
import {
  ASSIGN_TASKS_REQUEST,
  ASSIGN_TASKS_SUCCESS,
  ASSIGN_TASKS_FAIL,
  UPDATE_ASSIGN_TASKS_REQUEST,
  UPDATE_ASSIGN_TASKS_SUCCESS,
  UPDATE_ASSIGN_TASKS_FAIL,
  ASSIGN_TASKS_BY_ID_REQUEST,
  ASSIGN_TASKS_BY_ID_SUCCESS,
  ASSIGN_TASKS_BY_ID_FAIL,
  ASSIGN_TASKS_BY_ID_AND_NAME_REQUEST,
  ASSIGN_TASKS_BY_ID_AND_NAME_SUCCESS,
  ASSIGN_TASKS_BY_ID_AND_NAME_FAIL,
} from "../constants/assignTaskConstants";

export const getAssignRolesById = async (role, task) => {
  try {
    const { data } = await axios.get(`/api/assignedRoles/get/${role}/${task}`);
    console.log(data.data);

    return data.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getAssignRolesByIdAndNames =
  (role, taskName) => async (dispatch) => {
    try {
      dispatch({ type: ASSIGN_TASKS_BY_ID_AND_NAME_REQUEST });
      console.log(role, taskName);
      const { data } = await axios.get(
        `/api/assignedRoles/getByIdandName/${role}?taskName=${taskName}`
      );
      console.log(data.status);

      dispatch({
        type: ASSIGN_TASKS_BY_ID_AND_NAME_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: ASSIGN_TASKS_BY_ID_AND_NAME_FAIL,
        payload: error.response,
      });
    }
  };

export const getPermissionByIdAndNames = async (role, taskName) => {
  try {
    const { data } = await axios.get(
      `/api/assignedRoles/getByIdandName/${role}?taskName=${taskName}`
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error.response);
  }
};
export const getOnlyAssignedTaskByRole = async (role) => {
  console.log(role);
  try {
    const config = { Headers: { "Content-Type": "application/json" } };
    const data = await axios.get(
      `/api/assignedRoles/getTaskByRole/${role}`,
      config
    );
    console.log(data);
    return data;
  } catch (e) {
    return e.response;
  }
};

export const changeAssignRolesById =
  (role, task, status) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ASSIGN_TASKS_REQUEST });
      const values = { role, task, status };
      const { data } = await axios.post(`/api/assignedRoles/post`, values);
      dispatch({
        type: UPDATE_ASSIGN_TASKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ASSIGN_TASKS_FAIL,
        payload: error.response,
      });
    }
  };
