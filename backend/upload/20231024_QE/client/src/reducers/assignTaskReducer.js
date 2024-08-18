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
  CLEAR_ERRORS,
} from "../constants/assignTaskConstants";

export const AssignTaskByIdNameReducer = (
  state = { assignTask: [] },
  action
) => {
  switch (action.type) {
    case ASSIGN_TASKS_BY_ID_AND_NAME_REQUEST:
      return {
        loading: true,
        assignTask: [],
      };
    case ASSIGN_TASKS_BY_ID_AND_NAME_SUCCESS:
      return {
        loading: false,
        assignTask: action.payload,
      };
    case ASSIGN_TASKS_BY_ID_AND_NAME_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const UpdateTaskStatusReducer = (
  state = { UpdateTaskStatus: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_ASSIGN_TASKS_REQUEST:
      return {
        loading: true,
        UpdateTaskStatus: [],
      };
    case UPDATE_ASSIGN_TASKS_SUCCESS:
      return {
        loading: false,
        UpdateTaskStatus: action.payload,
      };
    case UPDATE_ASSIGN_TASKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
