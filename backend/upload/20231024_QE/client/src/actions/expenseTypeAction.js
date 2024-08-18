import axios from "axios";
import API from "./baseURL";
export const getExpenses = async () => {
  try {
    const { data } = await axios.get("/api/expenseType/get");
    console.log(data);
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to fetch expenses");
  }
};
export const getExpenseDetails = async (id) => {
  try {
    const { data } = await axios.get(`/api/expenseType/get/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to fetch expenses");
  }
};

export const updateExpenseType = async (
  id,
  expenseType,
  expenseDescription
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/expenseType/put/${id}`,
      {
        expenseType,
        expenseDescription,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteExpenseType = async (id) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.delete(`/api/expenseType/delete/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postExpenseType = async (expenseType, expenseDescription) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = axios.post(
      "/api/expenseType/post",
      {
        expenseType,
        expenseDescription,
      },
      config
    );
    return data;
  } catch (error) {
    // console.warn(error);
    throw new Error("Failed to add expenses");
  }
};
