import {
  POST_LOCAL_RATES_REQUEST,
  POST_LOCAL_RATES_SUCCESS,
  POST_LOCAL_RATES_FAIL,
  CLEAR_ERRORS,
} from "../constants/ratesMetalLocalConstants";

export const UpdateLocalRatesReducer = (
  state = { updateLocalRates: [] },
  action
) => {
  switch (action.type) {
    case POST_LOCAL_RATES_REQUEST:
      return {
        loading: true,
        updateLocalRates: [],
      };
    case POST_LOCAL_RATES_SUCCESS:
      return {
        loading: false,
        updateLocalRates: action.payload,
      };
    case POST_LOCAL_RATES_FAIL:
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
