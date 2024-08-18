import React, { useEffect } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Box } from "@mui/material";
import { Typography } from "@mui/material";
import style from "./UserList.module.css";
import { AllowUser, getAssignRolesByIdAndNames } from "../../../api";
import { RotatingLines } from "react-loader-spinner";
import ChangeUserRoleModel from "./changeUserRoleModel";

import { useState } from "react";

import { getUnverifiedUser, getVerifiedUser } from "../../../api";
import Navbar from "../../Navbar/Navbar";
import TableComponent from "../../TableComponent/tableComponent";

const UserList = () => {
  const [selectedOption, setSelectedOption] = useState("Active Users");
  const [unverifiedUserList, setUnverifiedUserList] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [permission, setPermission] = useState(false);
  const [PermissionForRoleChange, setPermissionForRoleChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [roleData, setRoleData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedOption("Active Users");
    async function getPermission() {
      try {
        const data = await getAssignRolesByIdAndNames(
          JSON.parse(localStorage.getItem("userRoleId")),
          "View User"
        );
        // console.log(data.data.status);
        setPermission(data.data.status);
        // setLoading(true);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    async function getPermissionForRoleChange() {
      try {
        const data = await getAssignRolesByIdAndNames(
          JSON.parse(localStorage.getItem("userRoleId")),
          "Change User Role"
        );
        // console.log(data.data.status);
        setPermissionForRoleChange(data.data.status);
        setLoading(true);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the async function
    getPermission();
    getPermissionForRoleChange();
  }, []);
  useEffect(() => {
    selectedOption === "Active Users" ? call2() : call();
  }, [rerender, selectedOption, open]);

  console.log("called");
  async function call() {
    const userList = await getUnverifiedUser();
    console.log("call");
    console.log(userList);
    setUnverifiedUserList([...userList]);
  }
  async function call2() {
    const userList = await getVerifiedUser();
    console.log(userList.userAll);
    setVerifiedUsers([...userList.userAll]);
  }

  //For handling change of active and unactive users
  const handleSwitchChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const columnsForCustomerList = [
    { id: "name", label: "Name", minWidth: 200 },
    { id: "emailAddress1", label: "Email Address", minWidth: 200 },
    {
      id: "isEmailVerified",
      label: "Email Verified Status",
      minWidth: 200,
      format: "bool",
    },
    // { id: "finalWeight", label: "Allow", minWidth: 100 },
    // { id: "pureWeight", label: "Deny", minWidth: 100 },
  ];
  const columnsForCustomerListForActiveUsers = [
    { id: "name", label: "Name", minWidth: 200 },
    { id: "emailAddress1", label: "Email Address", minWidth: 200 },
    {
      id: "isEmailVerified",
      label: "Email Verified Status",
      minWidth: 200,
      format: "bool",
    },
    { id: "role.roleName", label: "Role", minWidth: 100 },
    // { id: "pureWeight", label: "Deny", minWidth: 100 },
  ];

  const actions = [
    {
      id: "Allow",
      color: "white",
      minWidth: "100",
      backgroundColor: "blue",
      label: "User List",
    },
    {
      id: "Deny",
      color: "white",
      minWidth: "100",
      backgroundColor: "blue",
      label: "User List",
    },
  ];

  const actionsChangeRole = [
    {
      id: "Change Role",
      color: "white",
      minWidth: "100",
      backgroundColor: "blue",
      label: "User List",
    },
  ];

  const AllowButton = async (item) => {
    setRerender((prev) => !prev);
    await AllowUser(item, "true");
  };

  const DenyButton = async (item) => {
    setRerender((prev) => !prev);
    await AllowUser(item, "false");
  };

  const handleRoleChange = async (data) => {
    console.log(data);
    setRoleData(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      {loading ? (
        permission ? (
          <Box sx={{ width: "80%", margin: "0 auto" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography
                variant="h3"
                sx={{ textAlign: "left", margin: "30px 0 0 0 " }}
              >
                {selectedOption === "Active Users"
                  ? "Active Users"
                  : "Pending Approval"}
              </Typography>
              <Box>
                <RadioGroup
                  name="userOptions"
                  value={selectedOption}
                  onChange={handleSwitchChange}
                  row
                >
                  <FormControlLabel
                    value="Active Users"
                    control={<Radio />}
                    label="Active Users"
                    sx={{ color: "blue" }}
                  />
                  <FormControlLabel
                    value="Deleted Users"
                    control={<Radio />}
                    label="Pending Approvals"
                    sx={{ color: "red" }}
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Box sx={{ wdth: "80%" }}>
              {selectedOption === "Active Users" ? (
                <>
                  {PermissionForRoleChange ? (
                    <TableComponent
                      props={{
                        data: verifiedUsers,
                        columns: columnsForCustomerListForActiveUsers,
                        action: actionsChangeRole,
                        handleRoleChange: handleRoleChange,
                      }}
                    />
                  ) : (
                    <TableComponent
                      props={{
                        data: verifiedUsers,
                        columns: columnsForCustomerListForActiveUsers,
                      }}
                    />
                  )}
                </>
              ) : (
                <TableComponent
                  props={{
                    data: unverifiedUserList,
                    columns: columnsForCustomerList,
                    action: actions,
                    allowButton: AllowButton,
                    denyButton: DenyButton,
                  }}
                />
              )}
            </Box>

            {/* //Modal for changing Role */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={style.modelStyle}>
                <ChangeUserRoleModel
                  props={{
                    open: open,
                    setOpen: setOpen,
                    roleData: roleData,
                  }}
                />
              </Box>
            </Modal>
          </Box>
        ) : (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Not allowed By Admin
          </h1>
        )
      ) : (
        <Box textAlign="center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        </Box>
      )}
    </>
  );
};

export default UserList;
