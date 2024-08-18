import {
  GET_TRANSFER_PRODUCT_FAIL,
  GET_TRANSFER_PRODUCT_REQUEST,
  GET_TRANSFER_PRODUCT_SUCCESS,
} from "../constants/transferConstants";
import axios from "axios";
export const getTransferRecord = async () => {
  try {
    const { data } = await axios.get("/api/transferProduct/get");
    return data;
  } catch (error) {}
};

export const postTransferProduct = async (
  transferFrom,
  transferTo,
  transferBy,
  address,
  phoneNo,
  list
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/transferProduct/post",
      {
        transferFrom,
        transferTo,
        transferBy,
        address,
        phoneNo,
        list,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTempTransferPendingsFromTable = async (id) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(
      `/api/transferProduct/deleteFromTransferPendings/${id}`
    );
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const getTransferInvoiceRecord = async (storageCode) => {
  try {
    const { data } = await axios.get(
      `/api/transferProduct/getInvoiceRecordOnStorageCode/${storageCode}`
    );
    return data;
  } catch (error) {}
};

export const getProductLocationOnGodownAndProductId = async (
  productId,
  godownAvalibilityId
) => {
  try {
    console.log(productId);
    console.log(godownAvalibilityId);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(
      `/api/transferProduct/getProductLocationOnGodownAndProductId/${productId}/${godownAvalibilityId}`,
      config
    );
    return data;
  } catch (error) {}
};

export const getTransferDetailsForPreview = async (salesId) => {
  try {
    const data = await axios.get(`/api/transferProduct/get/${salesId}`);
    return data;
  } catch (error) {
    console.log("Failed to fetch purchase details");
  }
};
