import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import AddIcon from "@mui/icons-material/Add";
import style from "./rolesStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Box } from "@mui/material";
import { getRoles, getAssignRolesByIdAndNames } from "../../../api/index";
import TableComponent from "../../../components/TableComponent/tableComponent";
import NewRole from "./NewRole";

const RolesTable = () => {
  //General UseStates
  const [roleData, setRoleData] = useState([]);
  const [permission, setPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Call the async function
    getPermission();
  }, []);

  const getRolesData = async () => {
    const record = await getRoles();
    const roles = record.data.data.filter(
      (role) => role.roleName !== "Administrator"
    );
    setRoleData(roles);
    setLoading(true);
    console.log(record.data.data);
  };
  async function getPermission() {
    try {
      const data = await getAssignRolesByIdAndNames(
        JSON.parse(localStorage.getItem("userRoleId")),
        "View Roles"
      );
      // console.log(data.data.status);
      setPermission(data.data.status);
      getRolesData();

      // setLoading(true);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleClose = () => {
    setOpen(!open);
  };

  const columnsRole = [
    { id: "roleName", label: "Name" },
    { id: "roleDescription", label: "Description" },
  ];

  const actionsForVerifiedUser = [
    {
      id: "change Permission",
      color: "white",
      minWidth: "100",
      backgroundColor: "blue",
      label: "Change Permission",
    },
  ];

  const handleChangePermission = async (data) => {
    console.log(data);
    localStorage.setItem("userpermission", JSON.stringify(data._id));
    localStorage.setItem(
      "roleNameForPermissions",
      JSON.stringify(data.roleName)
    );
    navigate("/rolesAssign");
  };
  return (
    <>
      {loading ? (
        permission ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "85%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <h1>Roles</h1>
                {/* <Button
            variant="outlined"
            endIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Role
          </Button> */}
              </Box>
              <Box>
                {JSON.parse(localStorage.getItem("userRoleName")) ===
                "Administrator" ? (
                  <TableComponent
                    props={{
                      data: roleData,
                      columns: columnsRole,
                      action: actionsForVerifiedUser,
                      handleChangePermission: handleChangePermission,
                      //   action: actionsForTradeReport,
                      //   handleChildButtonClick: handleChildButtonClickForTradeReport,
                      //   handlePrint: handlePrintTrade,
                    }}
                  />
                ) : (
                  <TableComponent
                    props={{
                      data: roleData,
                      columns: columnsRole,
                    }}
                  />
                )}
              </Box>
            </Box>
            {/* //call the model for onclick on add role */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={style.modelStyle}>
                <NewRole />
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
        <Box sx={{ marginTop: "50%", textAlign: "center" }}>
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

export default RolesTable;
