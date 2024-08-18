import axios from "axios";

import {
  ALL_COMOPANY_DELETE_SUCCESS,
  ALL_COMPANY_DELETE_FAIL,
  ALL_COMPANY_DELETE_REQUEST,
  ALL_COMPANY_DETAILS_FAIL,
  ALL_COMPANY_DETAILS_REQUEST,
  ALL_COMPANY_DETAILS_SUCCESS,
  ALL_COMPANY_POST_FAIL,
  ALL_COMPANY_POST_REQUEST,
  ALL_COMPANY_POST_SUCCESS,
  ALL_COMPANY_REQUEST,
  ALL_COMPANY_SUCCESS,
  ALL_COMPANY_UPDATE_FAIL,
  ALL_COMPANY_UPDATE_REQUEST,
  ALL_COMPANY_UPDATE_SUCCESS,
} from "../constants/companyContants";
import API from "./baseURL";
import { ALL_COLOR_FAIL } from "../constants/colorConstants";

export const getCompany = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COMPANY_REQUEST });
    const { data } = await axios.get("/api/company/get");
    dispatch({
      type: ALL_COMPANY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COLOR_FAIL,
      payload: error.response,
    });
  }
};

export const getCompanyy = async () => {
  try {
    const { data } = await axios.get("/api/company/get");
    return data;
  } catch (error) {
    console.log("chie");
  }
};

export const getCompanyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COMPANY_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/company/get/${id}`);
    dispatch({
      type: ALL_COMPANY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COMPANY_DETAILS_FAIL,
      payload: error.response,
    });
  }
};

export const postCompany = async (companyName, address) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/company/post",
      {
        companyName,
        address,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const updateCompany = async (id, companyName, address) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/company/put/${id}`,
      {
        companyName,
        address,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteCompany = async (id) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(`/api/company/delete/${id}`);
    return data;
  } catch (error) {
    //    console.log(error.response)
    return error.response;
  }
};
