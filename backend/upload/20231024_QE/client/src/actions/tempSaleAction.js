import {
  GET_TEMP_SALE_FAIL,
  GET_TEMP_SALE_REQUEST,
  GET_TEMP_SALE_SUCCESS,
  POST_TEMP_SALE_FAIL,
  POST_TEMP_SALE_REQUEST,
  POST_TEMP_SALE_SUCCESS,
  TEMP_SALE_DELETE_FAIL,
  TEMP_SALE_DELETE_ITEM_FAIL,
  TEMP_SALE_DELETE_ITEM_REQUEST,
  TEMP_SALE_DELETE_ITEM_SUCCESS,
  TEMP_SALE_DELETE_REQUEST,
  TEMP_SALE_DELETE_SUCCESS,
  TEMP_SALE_DETAILS_FAIL,
  TEMP_SALE_DETAILS_REQUEST,
  TEMP_SALE_DETAILS_SUCCESS,
  TEMP_SALE_ON_SHOPNO_FAIL,
  TEMP_SALE_ON_SHOPNO_REQUEST,
  TEMP_SALE_ON_SHOPNO_SUCCESS,
  UPDATE_TEMP_SALE_PRODUCTS_FAIL,
  UPDATE_TEMP_SALE_PRODUCTS_REQUEST,
  UPDATE_TEMP_SALE_PRODUCTS_SUCCESS,
} from "../constants/tempSaleConstants";
import axios from "axios";
export const getTemppSale = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TEMP_SALE_REQUEST });
    const { data } = await axios.get("/api/saleProduct/getTemp");
    console.log(data);
    dispatch({
      type: GET_TEMP_SALE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEMP_SALE_FAIL,
      payload: error.response,
    });
  }
};

export const getTemporarySaleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEMP_SALE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/saleProduct/getTempSale/${id}`);
    console.log(data);
    dispatch({
      type: TEMP_SALE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEMP_SALE_DETAILS_FAIL,
      payload: error.response,
    });
  }
};

export const getTemporarySaleOnShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEMP_SALE_ON_SHOPNO_REQUEST });
    const { data } = await axios.get(
      `/api/saleProduct/getTempSalePending/${id}`
    );
    console.log(data);
    dispatch({
      type: TEMP_SALE_ON_SHOPNO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEMP_SALE_ON_SHOPNO_FAIL,
      payload: error.response,
    });
  }
};

export const getTemporarySale = async () => {
  try {
    const { data } = await axios.get("/api/saleProduct/getTemp");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postTempSale =
  (customerName, customerNumber, shopId, address, phoneNo, products) =>
  async (dispatch) => {
    try {
      let shopNo = JSON.parse(localStorage.getItem("shopId"));
      //  let id = JSON.parse(localStorage.getItem("shopId"));
      console.log(shopNo);
      console.log(customerName);
      console.log(customerNumber);
      console.log(shopId);
      console.log(products);
      dispatch({ type: POST_TEMP_SALE_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/saleProduct/createTemporarySales",
        {
          shopNo,
          customerName,
          customerNumber,
          shopId,
          address,
          phoneNo,
          products,
        },
        config
      );
      dispatch({ type: POST_TEMP_SALE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: POST_TEMP_SALE_FAIL, payload: error.response });
    }
  };

export const deleteTempSaleItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEMP_SALE_DELETE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(`/api/saleProduct/deleteTemp/${id}`);
    console.log(data);
    dispatch({ type: TEMP_SALE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: TEMP_SALE_DELETE_FAIL, payload: error.response });
  }
};

export const deleteTempSalePendingsFromTable = async (id) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(
      `/api//saleProduct/deleteFromPendings/${id}`
    );
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const deleteTempSaleItemList = (tempProductId) => async (dispatch) => {
  try {
    dispatch({ type: TEMP_SALE_DELETE_ITEM_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(
      `/api/saleProduct/deleteTempSaleProduct/${tempProductId}`
    );
    console.log(data);
    dispatch({ type: TEMP_SALE_DELETE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: TEMP_SALE_DELETE_ITEM_FAIL, payload: error.response });
  }
};

export const updateTempSaleProducts =
  (
    id1,
    id,
    Code,
    color,
    Namee,
    Company,
    PurchaseQuantity,
    amount,
    barcode,
    quantityidset,
    locationsetid,
    productColor,
    shopIdForData,
    Discount,
    excludeTaxPrice,
    taxPercentage,
    totalAmounnt,
    taxAmount
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TEMP_SALE_PRODUCTS_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/saleProduct/updateTempSales/${id1}`,
        {
          id,
          Code,
          color,
          Namee,
          Company,
          PurchaseQuantity,
          amount,
          barcode,
          quantityidset,
          locationsetid,
          productColor,
          shopIdForData,
          Discount,
          excludeTaxPrice,
          taxPercentage,
          totalAmounnt,
          taxAmount,
        },
        config
      );
      dispatch({ type: UPDATE_TEMP_SALE_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: UPDATE_TEMP_SALE_PRODUCTS_FAIL,
        payload: error.response,
      });
    }
  };

export const updateTempSaleQuantityInListProducts =
  (
    PurchaseQuantity,
    amount,
    Discount,
    excludeTaxPrice,
    totalAmounnt,
    taxAmount,
    quantityidset,
    locationsetid,
    shopIdForData
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TEMP_SALE_PRODUCTS_REQUEST });
      console.log(PurchaseQuantity);
      console.log(amount);
      console.log(Discount);
      console.log(excludeTaxPrice);
      console.log(totalAmounnt);
      console.log(taxAmount);
      console.log(quantityidset);
      console.log(locationsetid);
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/saleProduct/updateTempSaleProductQuantity/${quantityidset}/${locationsetid}`,
        {
          PurchaseQuantity,
          amount,
          Discount,
          excludeTaxPrice,
          totalAmounnt,
          taxAmount,
          shopIdForData,
        },
        config
      );
      dispatch({ type: UPDATE_TEMP_SALE_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: UPDATE_TEMP_SALE_PRODUCTS_FAIL,
        payload: error.response,
      });
    }
  };
