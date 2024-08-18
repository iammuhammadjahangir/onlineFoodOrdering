import {
  GET_SALE_PRODUCT_FAIL,
  GET_SALE_PRODUCT_REQUEST,
  GET_SALE_PRODUCT_SUCCESS,
  POST_SALE_PRODUCT_FAIL,
  POST_SALE_PRODUCT_REQUEST,
  POST_SALE_PRODUCT_SUCCESS,
} from "../constants/saleConstants";
import axios from "axios";
export const postSaleProduct = async (
  InvoiceNumber,
  shopNo,
  clientName,
  clientAddress,
  address,
  phoneNo,
  saleBy,
  list,
  total
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/saleProduct/post",
      {
        InvoiceNumber,
        shopNo,
        clientName,
        clientAddress,
        address,
        phoneNo,
        saleBy,
        list,
        total,
      },
      config
    );

    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getSaleRecord = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SALE_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/saleProduct/get");
    dispatch({
      type: GET_SALE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SALE_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

export const getSaleConsolidatedRecord = async () => {
  try {
    const { data } = await axios.get("/api/saleProduct/get");
    return data;
  } catch (error) {}
};

export const getProductLocationOnShopAndProductId = async (
  productId,
  colorId,
  shopAvalibilityId
) => {
  try {
    console.log(productId);
    console.log(shopAvalibilityId);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(
      `/api/saleProduct/getProductLocationOnShopAndProductId/${productId}/${colorId}/${shopAvalibilityId}`,
      config
    );
    return data;
  } catch (error) {}
};

export const getSpecificSaleProduct = async (salesId) => {
  try {
    const data = await axios.get(`/api/saleProduct/get/${salesId}`);
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to fetch specific sale product");
  }
};
