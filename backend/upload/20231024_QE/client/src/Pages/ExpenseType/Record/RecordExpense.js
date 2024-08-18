import React, { useContext, useEffect, useState } from "react";
import MetaData from "../../../MetaData";
import { Link } from "react-router-dom";
import { tableState } from "../../../Components/tableComponent/tableContext";
import { useParams, useNavigate } from "react-router-dom";
// import TableUser from "../TableUser/TableUserColor";
import ExpenseTable from "../expenseTable/ExpenseTable";
import { useTranslation } from "react-i18next";
import "../expenseTypeCss/expenseType.css";
import { Button, TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { refreshTokken } from "../../../actions/userAction";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

let isCalled = "false";
const RecordExpense = () => {
  const [state, setstate] = useState({
    users: [],
    online: 0,
  });
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [canAddExpensePermission, setCanAddExpensePermission] = useState(false);
  const [canViewExpensePermission, setCanViewExpensePermission] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCanAddExpensePermission(false);
    setCanViewExpensePermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Add Expense Type");
      setCanAddExpensePermission(permissionForAdd);
      const permission = await getPermissionForRoles("View Expense Type");
      console.log(permission);
      setCanViewExpensePermission(permission);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled = "false";
  }, [rowCount]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);
  const [statee, setStatee] = useState({
    userss: [],
    online: 0,
  });
  return (
    <>
      <MetaData title="QE ~~ExpenseType" />
      <div className={`expenseType ${colorTheme}`}>
        {canViewExpensePermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3> {t("Expense Type")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
              {canAddExpensePermission && (
                <Button
                  className="button-styled" /* Apply the CSS class to the button */
                  variant="outlined"
                  color="error"
                  endIcon={<AddOutlinedIcon fontSize="small" color="error" />}
                  onClick={() => {
                    navigate("/expenseForm");
                  }}
                >
                  {t("add-expenseType")}
                </Button>
              )}
            </div>
            <ExpenseTable />
          </>
        )}
      </div>
    </>
    //   <div className="div1Container">
    //   <div style={{width: "75%"}}>
    //   <Stack spacing={2} direction="row" marginTop={5} alignItems="center">
    //   <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>
    //    {t('Expense Type')}
    //   </Typography>
    //   <ButtonGroup>
    //     <Typography className="typograpgy2" style={{ backgroundColor: "#62cb67", fontSize: 20, color: "#ffffff", padding: '10px' }}>
    //       {t('totalRecords')}&nbsp;&nbsp;
    //       <EventAvailableIcon fontSize="small" />
    //     </Typography>
    //     <Typography className="typograpgy3" style={{ backgroundColor: "#ffffff", fontSize: 20, color: "#393939", padding: '10px' }}>
    //       {rowCount}
    //     </Typography>
    //   </ButtonGroup>
    //   <Box flexGrow={1} textAlign="right"> {/* Use flexGrow to push the button to the right */}
    //     {(JSON.parse(localStorage.getItem("isAdministrator")) || JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
    //       <Button
    //         variant="outlined" color="error" endIcon={<AddOutlinedIcon fontSize="small" color="error"/>}
    //         onClick={() => {
    //           navigate("/expenseForm");
    //         }}
    //       >
    //    {t("add-expenseType")}
    //       </Button>
    //     )}
    //   </Box>
    // </Stack>
    // <ExpenseTable />
    //   </div>

    //   <br />
    // </div>
  );
};

export default RecordExpense;
