import axios from "axios";
import {
  LOCAL_RATES_REQUEST,
  LOCAL_RATES_SUCCESS,
  LOCAL_RATES_FAIL,
  POST_LOCAL_RATES_REQUEST,
  POST_LOCAL_RATES_SUCCESS,
  POST_LOCAL_RATES_FAIL,
  CLEAR_ERRORS,
} from "../constants/localRatesConstants";
import { API } from "../api/index";
export const getLocalRatesDetailsss = () => async (dispatch) => {
  try {
    console.log("gg");
    dispatch({ type: LOCAL_RATES_REQUEST });
    const link = `/api/Metal/MetalRatesLocal/get`;
    const { data } = await API.get(link);
    console.log(data);
    dispatch({ type: LOCAL_RATES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOCAL_RATES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getLocalRatesDetails = async () => {
  try {
    console.log("gg");
    // dispatch({ type: LOCAL_RATES_REQUEST });
    const link = `/api/Metal/MetalRatesLocal/get`;
    const { data } = await API.get(link);
    console.log(data);
    return data;
    // dispatch({ type: LOCAL_RATES_SUCCESS, payload: data });
  } catch (error) {
    // dispatch({
    //   type: LOCAL_RATES_FAIL,
    //   payload: error.response.data.message,
    // });
  }
};

export const updateLocalRatesDetails =
  (RawaSale, RawaPurchase, PieceSale, PiecePurchase) => async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      dispatch({ type: POST_LOCAL_RATES_REQUEST });
      const link = `/api/Metal/admin/MetalRatesLocal/new`;
      const { data } = await API.put(link, {
        RawaSale,
        RawaPurchase,
        PieceSale,
        PiecePurchase,
      });
      console.log(data);
      dispatch({ type: LOCAL_RATES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LOCAL_RATES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
