import {
    GLOBAL_RATES_REQUEST,
    GLOBAL_RATES_SUCCESS,
    GLOBAL_RATES_FAIL,
    POST_GLOBAL_RATES_REQUEST,
    POST_GLOBAL_RATES_SUCCESS,
    POST_GLOBAL_RATES_FAIL,
    CLEAR_ERRORS,
  } from "../constants/globalRatesConstants";
  
  export const GlobalRatesReducer = (state = { globalRates: [] }, action) => {
    switch (action.type) {
      case GLOBAL_RATES_REQUEST:
        return {
          loading: true,
          globalRates: [],
        };
      case GLOBAL_RATES_SUCCESS:
        return {
          loading: false,
          globalRates: action.payload,
        };
      case GLOBAL_RATES_FAIL:
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


  export const UpdateRatesReducer = (state = { updateglobalRates: [] }, action) => {
    switch (action.type) {
      case POST_GLOBAL_RATES_REQUEST:
        return {
          loading: true,
          updateglobalRates: [],
        };
      case POST_GLOBAL_RATES_SUCCESS:
        return {
          loading: false,
          updateglobalRates: action.payload,
        };
      case POST_GLOBAL_RATES_FAIL:
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