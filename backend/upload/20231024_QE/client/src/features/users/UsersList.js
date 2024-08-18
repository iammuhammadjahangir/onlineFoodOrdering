import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../../MetaData";
// import { getUsers } from "../../Api";
import Arrow from "../../Components/ScrollArrow/arrow";
import BottomBar from "../../Components/bottomBar/bottomBar";
import { Link } from "react-router-dom";
import { tableState } from "../../Components/tableComponent/tableContext";
import TableComponentId from "../../Components/tableComponent/tableComponentId";
import { Input, Loader } from "semantic-ui-react";
import { useStore } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import UserTable from "../../Components/tableComponent/userTable";
import { Button, TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { getUsers } from "../../actions/userAction";
import { getShop } from "../../actions/shopAction";
import { getRole } from "../../actions/roleAction";
import { getPermissionForRoles } from "../../Pages/user/rolesAssigned/RolesPermissionValidation";

import "./users.css";
const UsersList = () => {
  //for Scrolling
  const tableContainerRef = useRef(null);
  const navigate = useNavigate();

  ///////////////////////////////////////////
  //useState for user data get
  const [userData, setUserData] = useState([]);
  const [isCalled, setIsCalled] = useState(true); //for called user data only once while loading page
  const [isLoading, setIsLoading] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [canAddUserPermission, setCanAddUserPermission] = useState(false);
  const [canViewUserPermission, setCanViewUserPermission] = useState(false);
  const actionEdit = "Edit User";
  const linkk = "editUser";
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);
  const dispatch = useDispatch();
  useEffect(() => {
    setCanAddUserPermission(false);
    setCanViewUserPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Add Users");
      setCanAddUserPermission(permissionForAdd);
      const permission = await getPermissionForRoles("View Users");
      console.log(permission);
      setCanViewUserPermission(permission);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    isCalled && call();
  }, [isCalled]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);
  const call = async () => {
    dispatch(getShop());
    dispatch(getRole());
    let result = await getUsers();
    setUserData(result);
    setIsCalled(false);
    setIsLoading(true);
    console.log(result);
    // console.log(result[0].active);
  };

  const columns = [
    { field: "username", label: t("userName") },
    { field: "roles.roleName", label: t("role") },
    { field: "shopNo.shopCode", label: t("shopNo") },
    { field: "posId", label: t("posId") },
    { field: "active", label: t("status"), format: "bool" },
    { field: "phoneNo", label: t("phoneNo") },
    { field: "whatsappNo", label: t("whatsappNo") },
  ];

  //seting actions for editing users
  const actions = [
    {
      label: "Edit User",
      color: "green",
      url: (itemId) => `/editUser/${itemId}`,
    },
  ];
  const classes = useStyles();
  return (
    <>
      <MetaData title="QE ~~Users" />
      <div className={`user ${colorTheme}`}>
        {canViewUserPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("users")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
              {canAddUserPermission && (
                <Button
                  className="button-styled" /* Apply the CSS class to the button */
                  variant="outlined"
                  color="error"
                  endIcon={<AddOutlinedIcon fontSize="small" color="error" />}
                  onClick={() => {
                    navigate("/newUserForm");
                  }}
                >
                  {t("add-user")}
                </Button>
              )}
            </div>
            <div className="search-withouInputfields-box"></div>

            <div className="table-container">
              {isLoading ? (
                <TableComponentId
                  data={userData}
                  columns={columns}
                  actions={actions}
                  linkk={linkk}
                  actionUpdate={actionEdit}
                />
              ) : (
                <Loader active>Loading</Loader>
              )}
            </div>

            {/* <TableUser /> */}
          </>
        )}
      </div>
    </>
    // <>
    //   <div className="div1Container">
    //     <div style={{ width: "75%" }}>
    //       {isLoading ? (
    //         <>
    //           <Stack
    //             spacing={2}
    //             direction="row"
    //             alignItems="center"
    //             style={{ marginTop: "50px" }}
    //           >
    //             <Typography
    //               className="typograpgy"
    //               style={{ color: "#000000", fontSize: 30 }}
    //             >
    //               {t("users")}
    //             </Typography>
    //             <ButtonGroup>
    //               <Typography
    //                 className={`typograpgy2 ${classes.records}`}
    //                 style={{
    //                   fontSize: 20,
    //                   marginTop: "10px",
    //                   marginBottom: "10px",
    //                 }}
    //               >
    //                 {t("totalRecords")}&nbsp;&nbsp;
    //                 <EventAvailableIcon fontSize="small" />
    //               </Typography>
    //               <Typography
    //                 className="typograpgy3"
    //                 style={{
    //                   backgroundColor: "#ffffff",
    //                   fontSize: 20,
    //                   color: "#393939",
    //                   padding: "2px",
    //                   paddingRight: "3px",
    //                   marginTop: "10px",
    //                   marginBottom: "10px",
    //                 }}
    //               >
    //                 {rowCount}
    //               </Typography>
    //             </ButtonGroup>
    //             <Box flexGrow={1} textAlign="right">
    //               {" "}
    //               {/* Use flexGrow to push the button to the right */}
    //               {true && (
    //                 <Button
    //                   variant="outlined"
    //                   color="error"
    //                   endIcon={
    //                     <AddOutlinedIcon fontSize="small" color="error" />
    //                   }
    //                   onClick={() => {
    //                     navigate("/newUserForm");
    //                   }}
    //                 >
    //                   {t("add-user")}
    //                 </Button>
    //               )}
    //             </Box>
    //           </Stack>

    //           <TableComponentId
    //             data={userData}
    //             columns={columns}
    //             actions={actions}
    //             linkk={linkk}
    //             actionUpdate={actionEdit}
    //           />
    //         </>
    //       ) : (
    //         <Loader active>Loading</Loader>
    //       )}
    //     </div>

    //     <br />
    //   </div>
    // </>
  );
};
export default UsersList;

const useStyles = makeStyles({
  records: {
    backgroundColor: "#62cb67",
    fontSize: "13px",
    color: "#ffffff",
    padding: "2px",
    paddingRight: "3px",
  },
});
