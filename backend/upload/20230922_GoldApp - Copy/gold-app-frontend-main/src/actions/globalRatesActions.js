import axios from "axios";
import {
  GLOBAL_RATES_REQUEST,
  GLOBAL_RATES_SUCCESS,
  GLOBAL_RATES_FAIL,
  POST_GLOBAL_RATES_REQUEST,
  POST_GLOBAL_RATES_SUCCESS,
  POST_GLOBAL_RATES_FAIL,
  CLEAR_ERRORS,
} from "../constants/globalRatesConstants";
import { API } from "../api/index";
export const getGlobalRatesDetails = async () => {
  try {
    const link = `/api/Metal/MetalRates/get`;
    const { data } = await API.get(link);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
// export const getGlobalRatesDetails = () => async (dispatch) => {
//   try {
//     dispatch({ type: GLOBAL_RATES_REQUEST });
//     const link = `/api/Metal/MetalRates/get`;
//     const { data } = await API.get(link);
//     console.log(data);
//     dispatch({ type: GLOBAL_RATES_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: GLOBAL_RATES_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const updateGlobalRatesDetails = async (values) => {
  try {
    const link = `/api/Metal/MetalRates/new`;
    const { data } = await API.put(link, values);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
// export const updateGlobalRatesDetails = (values) => async (dispatch) => {
//   try {
//     dispatch({ type: POST_GLOBAL_RATES_REQUEST });
//     const link = `/api/Metal/MetalRates/new`;
//     const { data } = await API.put(link, values);
//     console.log(data);
//     dispatch({ type: POST_GLOBAL_RATES_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: POST_GLOBAL_RATES_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

//clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
