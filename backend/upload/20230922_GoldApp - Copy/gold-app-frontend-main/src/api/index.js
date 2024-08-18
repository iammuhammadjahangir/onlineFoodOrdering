import axios from "axios";
import { useState } from "react";

// const url = "http://localhost:5000/purchaseForm/post";
export const API = axios.create({
  baseURL: "https://akbackend.softwisesol.com",
  // baseURL: "http://localhost:5000",
  // baseURL: "https://goldappreal.herokuapp.com",
  // baseURL: "https://gold-app-backend-production-5eca.up.railway.app",
});
// nmn

const token = JSON.parse(localStorage.getItem("userToken"));

export const submitPurchaseForm = (purchaseFormData) =>
  API.post("/api/purchaseForm/post", purchaseFormData);
export const deletePurchaseRecord = (id, status) => {
  console.log(status);
  return API.put(`/api/purchaseForm/delete/${id}`, status);
};
export const deleteTradeRecord = (id, status) => {
  console.log(status);
  return API.put(`/api/tradeForm/delete/${id}`, status);
};
export const submitTradeForm = (tradeFormData) =>
  API.post("/api/tradeForm/post", tradeFormData);
export const getPurchaseFromCal = (
  pageSize,
  reportID,
  startDate,
  endDate,
  checked
) =>
  API.get(
    `/api/purchaseForm/getCashSum/?pageSize=${pageSize}&&reportID=${reportID}&&startDate=${startDate}&&endDate=${endDate}&&checked=${checked}`
  );
export const getPurchaseDurationWise = (id, bool) =>
  API.get(`/api/purchaseForm/getDateWise/${id}/${bool}`);
export const getTradeDurationWise = (id, bool) =>
  API.get(`/api/tradeForm/getDateWise/${id}/${bool}`);
export const getTradeTypeWiseData = (id, bool) =>
  API.get(`/api/tradeForm/getTradeType/${id}/${bool}`);
export const getTradeFromCal = (
  pageSize,
  reportID,
  startDate,
  endDate,
  checked
) =>
  API.get(
    `/api/tradeForm/get/cashAndWeight?pageSize=${pageSize}&&reportID=${reportID}&&startDate=${startDate}&&endDate=${endDate}&&checked=${checked}`
  );

export const authForm = async (authFormData) => {
  try {
    const resp = await API.post("/api/goldapp/signup", authFormData);
    return resp.data;
  } catch (e) {
    // return (e.response.data);
    // alert(e.response.data)

    // alert(e.response.data.message);
    return e.response.data.message;
  }
};

export const authFormLogin = async (authFormData) => {
  try {
    const resp = await API.post("/api/goldapp/signin", authFormData);
    return resp.data;
  } catch (e) {
    // return (e.response.data);
    // alert(e.response.data)
    // alert(e.response.data.message);
    return e.response.data.message;
  }
};

export const getPurchaseFormData = (
  pageSize,
  reportID,
  startDate,
  endDate,
  checked
) =>
  API.get(
    `/api/purchaseForm/get?pageSize=${pageSize}&&reportID=${reportID}&&startDate=${startDate}&&endDate=${endDate}&&checked=${checked}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    }
  );
export const getTradeFormData = (
  pageSize,
  reportID,
  startDate,
  endDate,
  checked
) =>
  API.get(
    `/api/tradeForm/get?pageSize=${pageSize}&&reportID=${reportID}&&startDate=${startDate}&&endDate=${endDate}&&checked=${checked}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    }
  );

export const getUnverifiedUser = async () => {
  try {
    console.log("get user called");
    const resp = await API.get("/api/admin/getUnverifiedUser", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });
    return resp.data;
  } catch (e) {
    return e.response.data.message;
  }
};
export const getVerifiedUser = async () => {
  try {
    console.log("get user called");
    const resp = await API.get("/api/goldapp/getAllUser", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });
    return resp.data;
  } catch (e) {
    return e.response.data.message;
  }
};

export const AllowUser = async (uniqueKey, status) => {
  try {
    console.log("allow user called");
    await API.post(
      `/api/admin/allowUser/${uniqueKey}/${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        },
      }
    );
  } catch (e) {
    return e.response;
  }
};
export const VerifyForgotPassword = async (id) => {
  try {
    const resp = await API.post(`/api/admin/allowUser/${id}/`);

    return resp.data;
  } catch (e) {
    return e.response;
  }
};
export const forgotPasswordEmailVerify = async (emailAddress) => {
  try {
    const resp = await API.post(
      `/api/forgotPassword/EmailVerify/`,
      emailAddress
    );

    return resp.data;
  } catch (e) {
    return e.response.data.message;
  }
};
export const changePassword = async (changePasswordData) => {
  try {
    const resp = await API.post(
      `/api/forgotPassword/changePassword/`,
      changePasswordData
    );

    return resp.data;
  } catch (e) {
    return e.response.data.message;
  }
};

export const frontEndAuthAPI = async (token) => {
  try {
    const resp = await API.post(`/api/frontEnd/auth/`, token);

    return resp.data;
  } catch (e) {
    return e.response.data.message;
  }
};

export const postCustomer = async (data) => {
  try {
    return await API.post(`/api/customers/post`, data);
  } catch (e) {
    return e.response.data.message;
  }
};

export const getCustomer = async (checked) => {
  try {
    console.log("called", checked);
    return await API.get(`/api/customers/get/${checked}`);
  } catch (e) {
    return e.response.data.message;
  }
};
export const getCustomerNames = async (checked) => {
  try {
    console.log("called", checked);
    return await API.get(`/api/customers/get/${false}/Names`);
  } catch (e) {
    return e.response.data.message;
  }
};
export const deleteCustomerRecord = async (id, checked) => {
  try {
    console.log("called", checked);
    return await API.delete(`/api/customers/delete/${id}/${checked}`);
  } catch (e) {
    return e.response.data.message;
  }
};

export const postDailyEntry = async (values) => {
  try {
    const { customer, goldIn, goldout, cashIn, cashout } = values;
    console.log(customer, goldIn, goldout, cashIn, cashout);
    return await API.post(`/api/dailyEntry/post/customers`, values);
  } catch (e) {
    return e.response.data.message;
  }
};

export const getDailyEntry = async () => {
  try {
    return API.get(`/api/dailyEntry/get`);
  } catch (e) {
    return e.response.data.message;
  }
};

export const getRoles = async () => {
  try {
    return await API.get(`/api/role/get`);
  } catch (e) {
    return e.response.data.message;
  }
};
export const postRoles = async (values) => {
  console.log(values);
  try {
    return await API.post(`/api/role/post`, values);
  } catch (e) {
    return e.response.data.message;
  }
};
export const getTasks = async () => {
  try {
    return await API.get(`/api/task/get`);
  } catch (e) {
    return e.response.data.message;
  }
};
export const postTasks = async (values) => {
  console.log(values);
  try {
    return await API.post(`/api/task/post`, values);
  } catch (e) {
    return e.response.data.message;
  }
};

//methods for roles Assign
export const getAssignRolesById = async (role, task) => {
  console.log(role, task);
  try {
    return await API.get(`/api/assignedRoles/get/${role}/${task}`);
  } catch (e) {
    return e.response.data.message;
  }
};
export const getAssignRolesByIdAndNames = async (role, taskName) => {
  console.log(role, taskName);
  try {
    return await API.get(
      `/api/assignedRoles/getByIdandName/${role}?taskName=${taskName}`
    );
  } catch (e) {
    return e.response.data.message;
  }
};
export const getOnlyAllowedTasks = async (role) => {
  console.log(role);
  try {
    return await API.get(`/api/assignedRoles/getTaskByRole/${role}`);
  } catch (e) {
    return e.response.data.message;
  }
};
export const chengeAssignRolesById = async (role, task, status) => {
  console.log(role, task, status);
  try {
    const values = { role, task, status };
    return await API.post(`/api/assignedRoles/post`, values);
  } catch (e) {
    return e.response.data.message;
  }
};

//Update User Role
export const UpdateUserRole = async (userId, role) => {
  try {
    return await API.post(`/api/goldapp/changeUserRole/${userId}?role=${role}`);
  } catch (e) {
    return e.response.data.message;
  }
};
