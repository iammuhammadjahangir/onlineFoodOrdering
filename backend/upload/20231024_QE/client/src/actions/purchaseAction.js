import {
  ALL_PURCHASE_FAIL,
  ALL_PURCHASE_POST_FAIL,
  ALL_PURCHASE_POST_REQUEST,
  ALL_PURCHASE_POST_SUCCESS,
  ALL_PURCHASE_REQUEST,
  ALL_PURCHASE_SUCCESS,
} from "../constants/puchaseConstants";
import axios from "axios";
export const postPurchase =
  (productName, productDescription) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PURCHASE_POST_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/purchaseProduct/post",
        { productName, productDescription },
        config
      );
      dispatch({ type: ALL_PURCHASE_POST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ALL_PURCHASE_POST_FAIL, payload: error.response });
    }
  };

export const addPurchase = async (
  clientName,
  purchaseReceiptNumber,
  purchaseCompany,
  purchaseDate,
  address,
  phoneNo,
  shopNo,
  storeIn,
  purchasedBy,
  listpurchase,
  total
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/purchaseProduct/post",
      {
        clientName,
        purchaseReceiptNumber,
        purchaseCompany,
        purchaseDate,
        address,
        phoneNo,
        shopNo,
        storeIn,
        purchasedBy,
        listpurchase,
        total,
      },
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPurchaseRecord = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PURCHASE_REQUEST });
    const { data } = await axios.get("/api/purchaseProduct/get");
    dispatch({
      type: ALL_PURCHASE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PURCHASE_FAIL,
      payload: error.response,
    });
  }
};
export const getPurchaseConsolidatedRecord = async () => {
  try {
    const { data } = await axios.get("/api/purchaseProduct/get");
    return data;
  } catch (error) {}
};

export const getPurchaseDetailForPreview = async (salesId) => {
  try {
    const data = await axios.get(`/api/purchaseProduct/get/${salesId}`);
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to fetch purchase details");
  }
};
