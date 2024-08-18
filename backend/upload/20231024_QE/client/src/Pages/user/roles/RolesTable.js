import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import AddIcon from "@mui/icons-material/Add";
import style from "./rolesStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Box, Typography } from "@mui/material";

import { getRole } from "../../../actions/roleAction";
import { getAssignRolesByIdAndNames } from "../../../actions/assignTaskAction";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation, initReactI18next } from "react-i18next";
import NewRole from "./NewRole";

const action7 = "change Permission";
const RolesTable = () => {
  //General UseStates
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [roleData, setRoleData] = useState([]);
  const [permission, setPermission] = useState(false);
  const [open, setOpen] = useState(false);
  const { loading, role } = useSelector((state) => state.role);
  const { assignTask } = useSelector((state) => state.assignTask);

  useEffect(() => {
    getPermission();
  }, []);
  useEffect(() => {
    if (loading === false) {
      const roles = role.filter((role) => role.roleName !== "superAdmin");
      setRoleData(roles);
      // setRoleData(role);
    }
  }, [loading]);

  async function call() {
    try {
      dispatch(getRole());
    } catch (err) {}
  }
  async function getPermission() {
    try {
      console.log(JSON.parse(localStorage.getItem("userRoleId")));
      dispatch(
        getAssignRolesByIdAndNames(
          JSON.parse(localStorage.getItem("userRoleId")),
          "View Roles"
        )
      );

      //call to view All roles
      call();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleClose = () => {
    setOpen(!open);
  };

  const columns = [
    { field: "roleName", label: t("colorName") },
    { field: "roleDescription", label: t("colorDescription") },
  ];

  const actionsForVerifiedUser = [
    {
      label: "change Permission",
      color: "white",
    },
  ];
  return (
    <>
      {!loading ? (
        assignTask ? (
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
                <Typography
                  className="typograpgy"
                  style={{ color: "#000000", fontSize: 30 }}
                >
                  {t("roles")}
                </Typography>
              </Box>
              <Box>
                {JSON.parse(localStorage.getItem("roles")) === "superAdmin" ? (
                  <TableComponentId
                    data={roleData}
                    columns={columns}
                    actions={actionsForVerifiedUser}
                  />
                ) : (
                  <TableComponentId data={roleData} columns={columns} />
                )}
              </Box>
            </Box>
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
          <Loader active>Loading</Loader>
        </Box>
      )}
    </>
  );
};

export default RolesTable;
