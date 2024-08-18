import {
  ROLE_REQUEST,
  ROLE_SUCCESS,
  ROLE_FAIL,
  POST_ROLE_REQUEST,
  POST_ROLE_SUCCESS,
  POST_ROLE_FAIL,
  CLEAR_ERRORS,
} from "../constants/roleConstants";

export const roleReducer = (state = { role: [] }, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ROLE_REQUEST:
      return {
        loading: true,
        role: [],
      };
    case ROLE_SUCCESS:
      return {
        loading: false,
        role: action.payload,
      };
    case ROLE_FAIL:
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
