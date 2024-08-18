import { getPermissionByIdAndNames } from "../../../actions/assignTaskAction";

export const getPermissionForRoles = async (task) => {
  try {
    const data = await getPermissionByIdAndNames(
      JSON.parse(localStorage.getItem("userRoleId")),
      task
    );
    console.log(data);
    console.log(data.status);

    return data?.status;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
