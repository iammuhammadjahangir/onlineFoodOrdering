import axios from "axios";
import API from "./baseURL";
export const getExpenseRecord = async () => {
  try {
    const { data } = await axios.get("/api/expense/get");
    return data;
  } catch (error) {}
};

export const getExpenses = async () => {
  try {
    const { data } = await axios.get("/api/expenseType/get");
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to fetch expenses");
  }
};

export const postExpense = async (
  transferFromObjectId,
  expenseCategory,
  expenses,
  expenseTotal
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/expense/post",
      {
        transferFromObjectId,
        expenseCategory,
        expenses,
        expenseTotal,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getExpenseDetailsForPreview = async (id) => {
  try {
    console.log(id);
    const data = await axios.get(`/api/expenseType/get/${id}`);
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to fetch expense details");
  }
};

export const getExpenseDetail = async (salesId) => {
  try {
    const data = await axios.get(`/api/expense/get/${salesId}`);
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to fetch purchase details");
  }
};
