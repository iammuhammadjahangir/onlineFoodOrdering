import {
  POST_LOCAL_RATES_REQUEST,
  POST_LOCAL_RATES_SUCCESS,
  POST_LOCAL_RATES_FAIL,
  CLEAR_ERRORS,
} from "../constants/ratesMetalLocalConstants";
import { API } from "../api/index";

export const getLocalRatesDetails = async () => {
  try {
    // console.log("gg");
    const link = `/api/metalLocalRates/get`;
    const { data } = await API.get(link);
    // console.log(data);
    return data;
  } catch (error) {}
};

export const updateLocalRatesDetails =
  (RawaSale, RawaPurchase, PieceSale, PiecePurchase) => async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      dispatch({ type: POST_LOCAL_RATES_REQUEST });
      const link = `/api/metalLocalRates/new`;
      const { data } = await API.put(link, {
        RawaSale,
        RawaPurchase,
        PieceSale,
        PiecePurchase,
      });
      // console.log(data);
      dispatch({ type: POST_LOCAL_RATES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_LOCAL_RATES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
