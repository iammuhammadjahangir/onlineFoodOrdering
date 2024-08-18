import {
    TASK_REQUEST,
    TASK_SUCCESS,
    TASK_FAIL,
    POST_TASK_REQUEST,
    POST_TASK_SUCCESS,
    POST_TASK_FAIL,
    CLEAR_ERRORS
  } from "../constants/taskConstants";

  export const taskReducer = (state = { role: [] }, action) => {
    switch (action.type) {
      case TASK_REQUEST:
        return {
          loading: true,
          task: [],
        };
      case TASK_SUCCESS:
        return {
          loading: false,
          task: action.payload,
        };
      case TASK_FAIL:
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
  

  export const postTaskReducer = (state = { taskResponse: []}, action)=>{
    switch (action.type){
        case POST_TASK_REQUEST:
            return{
                loading: true,
                taskResponse: [],
            };
        case POST_TASK_SUCCESS: 
            return {
                loading: false,
                taskResponse: action.payload
            }
        case POST_TASK_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}