import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Loader } from "semantic-ui-react";
// import { RotatingLines } from "react-loader-spinner";
import style from "./rolesAssignStyle.css";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "../../../actions/taskAction";
import {
  getAssignRolesById,
  changeAssignRolesById,
} from "../../../actions/assignTaskAction";
// import {
//   getTasks,
//   getAssignRolesById,
//   chengeAssignRolesById,
// } from "../../../api/index";

const RolesAssign = () => {
  //General UseStates
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [taskPermissions, setTaskPermissions] = useState({});
  const { loading, task } = useSelector((state) => state.task);
  const [LoadData, setLoadData] = useState(false);
  useEffect(() => {
    //to get all the Tasks
    getUserTasks();
  }, []);

  //to get task and their permissions
  const getUserTasks = async () => {
    try {
      dispatch(getTask());

      // Collect permission promises
      const permissionPromises = task?.map((task) =>
        checkrolePermission(task._id)
      );

      
      console.log(permissionPromises);
      // Wait for all permission promises to resolve
      const permissions = await Promise.all(permissionPromises);

      // Create a task permission map
      const taskPermissionMap = {};
      task.forEach((task, index) => {
        taskPermissionMap[task._id] = permissions[index];
      });

      // Set the task permissions first
      setTaskPermissions(taskPermissionMap);

      // Then set the tasks
      setTasks(task);
      setLoadData(true);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  //call the backend api to checked wheather this role id and task id have permission to do this task or not
  const checkrolePermission = async (taskId) => {
    try {
      //to remove doubled quote from starting and endin of the role Id
      const roleId = localStorage
        .getItem("userpermission")
        .replace(/^"|"$/g, "");

      console.log(taskId);
      console.log(roleId);
      const data = await getAssignRolesById(roleId, taskId);
      console.log(data[0]?.status);
      //call the API to check role

      //      const result = await getAssignRolesById(roleId, taskId);

      //return the bool value to check the role
      // console.log(result.data.data[0].status);
      return data[0]?.status;
    } catch (error) {
      console.error("Error fetching permissions: ", error);
      return false;
    }
  };

  //Function to change the value in the database for role permission
  const handleCheckBoxChange = async (status, taskId) => {
    console.log(status);
    console.log(taskId);
    const roleId = localStorage.getItem("userpermission").replace(/^"|"$/g, "");

    dispatch(changeAssignRolesById(roleId, taskId, status));

    // const result = await chengeAssignRolesById(roleId, taskId, status);
  };

  // useEffect(() => {
  // if (loading) {
  //   const permissionPromises = tasks.map((task) =>
  //     checkrolePermission(task._id)
  //   );
  //   Promise.all(permissionPromises)
  //     .then((permissions) => {
  //       const taskPermissionMap = {};
  //       tasks.forEach((task, index) => {
  //         taskPermissionMap[task._id] = permissions[index];
  //       });
  //       console.log(taskPermissionMap);
  //       setTaskPermissions(taskPermissionMap);
  //     })
  //     .catch((error) => {
  //       console.error("Error checking permissions: ", error);
  //     });
  // }
  // }, [loading, tasks]);

  return (
    <Box sx={{ width: "85%", margin: "0 auto" }}>
      {LoadData ? (
        <Box>
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            Assign Permissions (
            {JSON.parse(
              localStorage.getItem("roleNameForPermissions")
            ).toUpperCase()}
            )
          </Typography>
          <Box
            sx={{
              width: "30%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            {tasks.length > 0 &&
              tasks.map((data, index) => {
                // console.log(data);
                // console.log(taskPermissions[data._id]);
                // console.log(typeof taskPermissions[data._id]);
                return (
                  <FormGroup key={index}>
                    <FormControlLabel
                      label={data.taskName}
                      labelPlacement="start"
                      control={
                        <Checkbox
                          defaultChecked={
                            taskPermissions[data._id] === true ? true : false
                          }
                          onClick={(e) =>
                            handleCheckBoxChange(e.target.checked, data._id)
                          }
                        />
                      }
                      sx={{ display: "flex", justifyContent: "space-between" , color:"black" }}
                    />
                  </FormGroup>
                );
              })}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader active>Loading</Loader>
        </Box>
      )}
    </Box>
  );
};

export default RolesAssign;
