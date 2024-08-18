import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { assignTasksArrayType } from "../../types/apiTypes";
import axiosInstance from "../axiosInstance";
export const assignedTasks = createApi({
  reducerPath: "assignedTasks",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/assigntask/`,
  }),
  endpoints: (builder) => ({
    assignedTasksArray: builder.query<assignTasksArrayType, string | undefined>(
      {
        query: (roleId) => `getTaskByRole/${roleId}`,
      }
    ),
  }),
});

export const getPermissionsForRole = async (task: string) => {
  try {
    const role = JSON.parse(localStorage.getItem("userRoleId") || "");
    console.log(role);

    if (!role) {
      return false;
    }
    const { data } = await axiosInstance.get(
      `/api/v1/assigntask/getByIdandName/${role}?taskName=${task}`
    );

    console.log(data);
    console.log(data.status);

    return data?.status;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const { useAssignedTasksArrayQuery } = assignedTasks;
