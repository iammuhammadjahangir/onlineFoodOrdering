import {
  ALL_ACTIVE_DASHBOARD_USER_REQUEST,
  ALL_ACTIVE_TOP_DASHBOARD_USER_FAIL,
  ALL_ACTIVE_TOP_DASHBOARD_USER_SUCCESS,
  ALL_DASHBOARD_FAIL,
  ALL_DASHBOARD_REQUEST,
  ALL_DASHBOARD_SUCCESS,
  ALL_EXPENSEDATA_FAIL,
  ALL_EXPENSEDATA_FORSHOP_FAIL,
  ALL_EXPENSEDATA_FORSHOP_REQUEST,
  ALL_EXPENSEDATA_FORSHOP_SUCCESS,
  ALL_EXPENSEDATA_REQUEST,
  ALL_EXPENSEDATA_SUCCESS,
  ALL_PURCHASEDATAFORDASHBOARD_FAIL,
  ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_FAIL,
  ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_REQUEST,
  ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_SUCCESS,
  ALL_PURCHASEDATAFORDASHBOARD_REQUEST,
  ALL_PURCHASEDATAFORDASHBOARD_SUCCESS,
  ALL_SALESDATAFORDASHBOARD_FAIL,
  ALL_SALESDATAFORDASHBOARD_REQUEST,
  ALL_SALESDATAFORDASHBOARD_SUCCESS,
  ALL_SALESDATAFORDASHBOARD_WITHUSER_FAIL,
  ALL_SALESDATAFORDASHBOARD_WITHUSER_REQUEST,
  ALL_SALESDATAFORDASHBOARD_WITHUSER_SUCCESS,
} from "../constants/dashboardConstants";

import API from "./baseURL";
import axios from "axios";

export const getTopSalesForDashBoard = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DASHBOARD_REQUEST });
    const { data } = await axios.get(`/api/saleProduct/gets`);
    dispatch({ type: ALL_DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_DASHBOARD_FAIL, payload: error.response });
  }
};

export const getTopSalesForDashBoardWithUser = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DASHBOARD_REQUEST });

    const { data } = await axios.get(
      `/api/saleProduct/gets/${JSON.parse(localStorage.getItem("shopId"))}`
    );
    dispatch({ type: ALL_DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_DASHBOARD_FAIL, payload: error.response });
  }
};

export const getActiveUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ACTIVE_DASHBOARD_USER_REQUEST });

    const { data } = await axios.get("/api/user/activeUsers");
    dispatch({ type: ALL_ACTIVE_TOP_DASHBOARD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ACTIVE_TOP_DASHBOARD_USER_FAIL,
      payload: error.response,
    });
  }
};

export const getSalesDataForDashBoard = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SALESDATAFORDASHBOARD_REQUEST });

    const { data } = await axios.get(`/api/saleProduct/getTotalSaleThisMonth`);
    dispatch({ type: ALL_SALESDATAFORDASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    // console.warn(error);
    dispatch({ type: ALL_SALESDATAFORDASHBOARD_FAIL, payload: error.response });
  }
};

export const getSalesDataForDashBoardWithUser = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SALESDATAFORDASHBOARD_WITHUSER_REQUEST });

    const { data } = await axios.get(
      `/api/saleProduct/getTotalSaleThisMonth/${JSON.parse(
        localStorage.getItem("shopId")
      )}`
    );

    dispatch({
      type: ALL_SALESDATAFORDASHBOARD_WITHUSER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.warn(error);
    dispatch({
      type: ALL_SALESDATAFORDASHBOARD_WITHUSER_FAIL,
      payload: error.response,
    });
  }
};

export const getPurchaseRecordForCurrentMonth = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PURCHASEDATAFORDASHBOARD_REQUEST });

    const { data } = await axios.get(
      `/api/purchaseProduct/getTotalPurcahseThisMonth`
    );
    dispatch({ type: ALL_PURCHASEDATAFORDASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    // console.warn(error);
    dispatch({
      type: ALL_PURCHASEDATAFORDASHBOARD_FAIL,
      payload: error.response,
    });
  }
};

export const getPurchaseRecordForCurrentMonthForShop =
  () => async (dispatch) => {
    try {
      dispatch({ type: ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_REQUEST });

      const { data } = await axios.get(
        `/api/purchaseProduct/getTotalPurcahseThisMonth/${JSON.parse(
          localStorage.getItem("shopId")
        )}`
      );
      dispatch({
        type: ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.warn(error);
      dispatch({
        type: ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_FAIL,
        payload: error.response,
      });
    }
  };

export const getExpensesThisMonth = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_EXPENSEDATA_REQUEST });

    const { data } = await axios.get(`/api/expense/getTotalExpenseThisMonth`);
    dispatch({ type: ALL_EXPENSEDATA_SUCCESS, payload: data });
  } catch (error) {
    // console.warn(error);
    dispatch({ type: ALL_EXPENSEDATA_FAIL, payload: error.response });
  }
};

export const getExpensesThisMonthForShop = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_EXPENSEDATA_FORSHOP_REQUEST });

    const { data } = await axios.get(
      `/api/expense/getTotalExpenseThisMonth/${JSON.parse(
        localStorage.getItem("shopId")
      )}`
    );
    dispatch({ type: ALL_EXPENSEDATA_FORSHOP_SUCCESS, payload: data });
  } catch (error) {
    // console.warn(error);
    dispatch({ type: ALL_EXPENSEDATA_FORSHOP_FAIL, payload: error.response });
  }
};
