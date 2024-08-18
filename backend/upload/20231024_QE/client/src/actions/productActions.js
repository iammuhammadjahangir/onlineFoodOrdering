import axios from "axios";
import API from "./baseURL";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  PRODUCTS_ON_BARCODE_FAIL,
  PRODUCTS_ON_BARCODE_REQUEST,
  PRODUCTS_ON_BARCODE_SUCCESS,
  PRODUCTS_ON_COMPANY_NAME_FAIL,
  PRODUCTS_ON_COMPANY_NAME_REQUEST,
  PRODUCTS_ON_COMPANY_NAME_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";
import {
  UPDATE_PURCHASE_PRODUCT_PRICE_FAIL,
  UPDATE_PURCHASE_PRODUCT_PRICE_REQUEST,
  UPDATE_PURCHASE_PRODUCT_PRICE_SUCCESS,
} from "../constants/productConstants";

export const getProduct = async () => {
  try {
    const { data } = await axios.get("/api/product/get");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductt = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/product/get");
    // return data;
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

export const getProductsOnBarcode = async (barcode) => {
  try {
    const { result } = await axios.get(`/api/product/barcode/${barcode}`);

    return result;
  } catch (error) {}
};

export const getProductDetails = async (id) => {
  try {
    const { data } = await axios.get(`/api/product/get/${id}`);
    console.log("befor");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsOnCompanyName = (companyName) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_ON_COMPANY_NAME_REQUEST });
    const { data } = await axios.get(
      `/api/product/getProductOnCompanyName/${companyName}`
    );
    console.log("befor");
    dispatch({
      type: PRODUCTS_ON_COMPANY_NAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ON_COMPANY_NAME_FAIL,
      payload: error.response,
    });
  }
};

export const postProduct = async (
  productTypeName,
  productCode,
  productName,
  productCompany,
  productColor,
  barcodeValue
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      "/api/product/post",
      {
        productTypeName,
        productCode,
        productName,
        productCompany,
        productColor,
        barcodeValue,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  id,
  productTypeName,
  productCode,
  productName,
  productCompany
) => {
  try {
    console.log(productTypeName);
    console.log(productCode);
    console.log(productName);
    console.log(productCompany);
    console.log(id);

    //    dispatch({type: UPDATE_PURCHASE_PRODUCT_PRICE_REQUEST})
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/product/putt/${id}`,
      {
        productTypeName,
        productCode,
        productName,
        productCompany,
      },
      config
    );
    return data;
    //    dispatch({type: UPDATE_PURCHASE_PRODUCT_PRICE_SUCCESS, payload: data})
  } catch (error) {
    console.log(error.response);
  }
};

export const updatePurchaseProductPrice = async (
  id,
  productCurrentPrice,
  productpriceExcludingTax,
  productDiscount,
  productExpenses,
  productTaxPrice
) => {
  try {
    //    dispatch({type: UPDATE_PURCHASE_PRODUCT_PRICE_REQUEST})
    console.log(id);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/product/putt/${id}`,
      {
        productCurrentPrice,
        productpriceExcludingTax,
        productDiscount,
        productExpenses,
        productTaxPrice,
      },
      config
    );
    //    dispatch({type: UPDATE_PURCHASE_PRODUCT_PRICE_SUCCESS, payload: data})
  } catch (error) {
    console.log(error.response);
  }
};

export const getProductOnBarcode = (barcode) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_ON_BARCODE_REQUEST });
    const { data } = await API.get(`/api/product/barcode/${barcode}`);
    console.log("befor");
    dispatch({
      type: PRODUCTS_ON_BARCODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ON_BARCODE_FAIL,
      payload: error.response,
    });
  }
};
