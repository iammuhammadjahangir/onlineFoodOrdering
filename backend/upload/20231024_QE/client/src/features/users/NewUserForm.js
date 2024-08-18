import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import MetaData from "../../MetaData";
import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Dropdown,
  Loader,
} from "semantic-ui-react";
import { isCancel } from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { gettStorage } from "../../actions/storageAction";
import { getUsers, postNewUser } from "../../actions/userAction";
import "./users.css";
let productMatch = "false";
let filteredRoles = [];
const NewUserForm = () => {
  // const translationFunctions = useTranslationForFunctions();
  const navigate = useNavigate();

  const [storage, setStorage] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [shopNo, setShopNo] = useState("");
  const [godownNo, setGodownNo] = useState([]);
  const [shopCode, setshopCode] = useState("");
  const [posId, setPosId] = useState("");
  const [userRole, setUserRole] = useState([]);
  const [userPassword, setUserPassword] = useState("");
  const [userPhoneNO, setUserPhoneNO] = useState("");
  const [userWhatsappNO, setUserWhatsappNO] = useState("");
  const [email, setEmail] = useState("");
  const [isCalled, setIsCalled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPasswordBool, setConfirmPasswordBool] = useState(false);
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(
    "Password must contain a combination of letters, digits, and special characters."
  );
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [confirmError, setConfirmError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { shop } = useSelector((state) => state.shop);
  const { role } = useSelector((state) => state.role);
  const { t } = useTranslation();
  //Roles Array
  const UserRolesArray = [
    { key: "superAdmin", text: "superAdmin", value: "superAdmin" },
    { key: "Admin", text: "Admin", value: "Admin" },
    { key: "Salesman", text: "Salesman", value: "Salesman" },
  ];
  const UserRolesForSuperAdminArray = [
    { key: "Administrator", text: "Administrator", value: "Administrator" },
    { key: "Admin", text: "Admin", value: "Admin" },
    { key: "Salesman", text: "Salesman", value: "Salesman" },
  ];

  //useEffect to load the shops
  useEffect(() => {
    //to clear all the input variable firstly while loading the page
    setName("");
    setUsername("");
    setShopNo("");
    setPosId("");
    setUserRole("");
    setUserPassword("");
    setUserPhoneNO("");
    setUserWhatsappNO("");
    setConfirmPasswordBool(false);

    //function to call the storage
    isCalled && callStorage();
  }, []);

  const callStorage = async () => {
    console.log(role);
    let result = await gettStorage();
    // console.log(storage);
    filteredRoles = role?.filter((roles) => roles.roleName !== "superAdmin");
    setStorage(result);
    setIsLoading(true); // to wait for the data to load before loading the page
    setIsCalled(false); //for calling the storage function only once in useEffect
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    productMatch = "false";
  });

  const handleStorageSelectChange = (event, { value }) => {
    setShopNo(value);
  };

  // const handleStorageGodownSelectChange = (event, { value }) => {
  //   setGodownNo(value);
  // };

  const handleUserRoleSelectChange = (event, { value }) => {
    setUserRole(value);
  };

  const validatePassword = (input) => {
    // Define a regex pattern that enforces the requirements
    const pattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*_])[A-Za-z\d@#$%^&!*_]{8,15}$/;
    // Test the input against the pattern
    return pattern.test(input);
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setUserPassword(inputValue);

    // Check if the input matches the pattern
    if (!validatePassword(inputValue)) {
      setError(true);
      setPasswordError(
        "Password must contain a combination of letters, digits, and special characters."
      );
    } else {
      setConfirmPasswordError("");
      setError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setUserConfirmPassword(inputValue);
    // Check if the input matches the pattern
    if (inputValue === userPassword) {
      setConfirmPasswordError("");
      setConfirmError(false);
      setConfirmPasswordBool(true);
      // Display an error message or apply some styling to indicate invalid input
    } else {
      setConfirmError(true);
      setConfirmPasswordError("Confirm Password Must Match with New Password");
      setConfirmPasswordBool(false);
    }
  };

  // const handleConfirmPassword = (value) => {
  //   console.log(value);
  //   setUserConfirmPassword(value);
  //   if (userPassword === value) {
  //     setConfirmPasswordBool(true);
  //   } else {
  //     setConfirmPasswordBool(false);
  //   }
  // };

  const handleSubmit = async () => {
    setConfirmPasswordBool(false);
    let result = await getUsers();

    console.log(godownNo);
    if (
      !name ||
      !username ||
      !userPassword ||
      !userRole ||
      !shopNo ||
      !posId ||
      !email ||
      !userPhoneNO ||
      !userWhatsappNO
    ) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textAllFieldsAreRequired"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else if (confirmPasswordBool === false) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textPasswordNotMatched"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      result.map((user) => {
        const userNam = user.username.replace(/\s+/g, " ").trim().toLowerCase();
        if (userNam === username.replace(/\s+/g, " ").trim().toLowerCase()) {
          productMatch = "true";
        }
      });
    }

    if (productMatch === "true") {
      setConfirmPasswordBool(true);
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: "User is already Available",
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      console.log(userRole);
      const result = await postNewUser(
        name,
        username,
        userPassword,
        userRole,
        shopNo,
        email,
        // godownNo,
        posId,
        userPhoneNO,
        userWhatsappNO
      );
      console.log(result);
      if (result) {
        swal.fire({
          icon: "success",
          title: t("titleAdded"),
          text: t("successMessage"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
        navigate("/usersList");
      }
    }
    // }
  };

  //Function to navigate to back page on clicking back button on mmodel
  const backPage = () => {
    navigate("/usersList");
  };

  return (
    <>
      <MetaData title="QE ~~RegisterUser" />
      <div className={`user ${colorTheme}`}>
        <div className="UserformInput">
          <div className="Userformrow">
            <div className="userform1">
              <label>{t("employeName")}</label>
              <input
                type="text"
                placeholder={t("enterEmployeName")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="userform1">
              <label>{t("userName")}</label>
              <input
                type="text"
                placeholder={t("enterUserName")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="Userformrow">
            <div className="userDropdownform1">
              <label>{t("shopNo")}</label>
              <Dropdown
                className="userFormdropdown"
                options={shop?.map((element) => ({
                  key: element._id,
                  text: element.shopCode,
                  value: element._id,
                }))}
                placeholder={t("enterShopNo")}
                selection
                search
                required
                autoComplete="off"
                value={shopNo}
                onChange={handleStorageSelectChange}
              />
            </div>
            <div className="userDropdownform1">
              <label>{t("role")}</label>
              <Dropdown
                className="userFormdropdown"
                options={
                  JSON.parse(localStorage.getItem("isAdministrator"))
                    ? filteredRoles?.map((role) => ({
                        key: role._id,
                        text: role.roleName,
                        value: role._id,
                      }))
                    : role?.map((role) => ({
                        key: role._id,
                        text: role.roleName,
                        value: role._id,
                      }))
                }
                placeholder={t("enterRole")}
                selection
                search
                required
                value={userRole}
                onChange={handleUserRoleSelectChange}
              />
            </div>
          </div>
          <div className="Userformrow">
            <div className="userform1">
              <label>{t("posId")}</label>
              <input
                type="text"
                placeholder={t("enterPOSId")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={posId}
                onChange={(e) => setPosId(e.target.value)}
              />
            </div>
            <div className="userform1">
              <label>{t("phoneNo")}</label>
              <input
                type="text"
                placeholder={t("enterPhoneNo")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={userPhoneNO}
                onChange={(e) => setUserPhoneNO(e.target.value)}
              />
            </div>
          </div>
          <div className="Userformrow">
            <div className="userform1">
              <label>{t("whatsappNo")}</label>
              <input
                type="text"
                placeholder={t("enterWhatsappNo")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={userWhatsappNO}
                onChange={(e) => setUserWhatsappNO(e.target.value)}
              />
            </div>
            <div className="userform1">
              <label>{t("email")}</label>
              <input
                type="email"
                placeholder={t("enterEmail")}
                autoComplete="off"
                maxLength="40"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="Userformrow">
            <div className="userform1">
              {error ? (
                <div
                  style={{ fontSize: "12px", color: "red", marginTop: "-10px" }}
                >
                  {passwordError}
                </div>
              ) : (
                <></>
              )}
              <label>{t("password")}</label>
              <input
                type="text"
                placeholder={t("enterPassword")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={userPassword}
                // onChange={(e) => setUserPassword(e.target.value)}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="userform1">
              {confirmError ? (
                <div
                  style={{ fontSize: "12px", color: "red", marginTop: "-10px" }}
                >
                  {confirmPasswordError}
                </div>
              ) : (
                <></>
              )}
              <label>{t("confirmPassword")}</label>
              <input
                type="text"
                placeholder={t("pleaseConfirmYourPassword")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={userConfirmPassword}
                // onChange={(e) => handleConfirmPassword(e.target.value)}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>

          {/* <div className="UserformrowLastinput">
            <div className="userform1">
              <label>{t("confirmPassword")}</label>
              <input
                type="text"
                placeholder={t("pleaseConfirmYourPassword")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={userConfirmPassword}
                onChange={(e) => handleConfirmPassword(e.target.value)}
              />
            </div>
          </div> */}

          <div className="userButtons">
            <Button
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <Button
              onClick={handleSubmit}
              type="button"
              className={`button button-add-product `}
            >
              {t("add-user")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* {isLoading ? (
        <Modal open dimmer="inverted" size="small" closeIcon="close">
           <Stack  backgroundColor="#ECECEC">
            <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
              <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("add-user")}</Typography>
            </Stack>
          <Stack padding={3}>
          <Modal.Content>
            <Form className={"formColorUser"}>
              <Form.Group widths="equal">
                <Form.Input
                  label={t("employeName")}
                  type="text"
                  placeholder={t("enterEmployeName")}
                  name="Name"
                  autoComplete="off"
                  maxLength="40"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Input
                  label={t("userName")}
                  type="text"
                  placeholder={t("enterUserName")}
                  name="UserName"
                  maxLength="40"
                  autoComplete="off"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  label={t("shopNo")}
                  options={shop?.map((element) => ({
                      key: element._id,
                      text: element.shopCode,
                      value: element._id,
                    }))
                  }
                  placeholder={t("enterShopNo")}
                  selection
                  required
                  search
                  value={shopNo}
                  onChange={handleStorageSelectChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
              <Form.Field
                  control={Select}
                  label={t("role")}
                  options={JSON.parse(localStorage.getItem('isAdministrator')) ? (UserRolesArray?.map((role) => ({
                    key: role.key,
                    text: role.text,
                    value: role.value,
                  }))):(UserRolesForSuperAdminArray?.map((role) => ({
                    key: role.key,
                    text: role.text,
                    value: role.value,
                  })))}                  
                  placeholder={t("enterRole")}
                  selection
                  search
                  required
                  value={userRole}
                  onChange={handleUserRoleSelectChange}
                />
            
                <Form.Input
                  label={t("posId")}
                  type="text"
                  placeholder={t("enterPOSId")}
                  name="PosId"
                  autoComplete="off"
                  maxLength="15"
                  value={posId}
                  onChange={(e) => setPosId(e.target.value)}
                />
              
              </Form.Group>
              <Form.Group widths="equal">
              <Form.Input
                  label={t("phoneNo")}
                  type="number"
                  placeholder={t("enterPhoneNo")}
                  name="PhoneNO"
                  maxLength="15"
                  autoComplete="off"
                  required
                  value={userPhoneNO}
                  onChange={(e) => setUserPhoneNO(e.target.value)}
                />
                <Form.Input
                  label={t("whatsappNo")}
                  type="number"
                  placeholder={t("enterWhatsappNo")}
                  name="whatsappNO"
                  autoComplete="off"
                  maxLength="15"
                  required
                  value={userWhatsappNO}
                  onChange={(e) => setUserWhatsappNO(e.target.value)}
                />
               
              </Form.Group>
              <Form.Group widths="equal">
              <Form.Input
                  label={t("password")}
                  type="Password"
                  placeholder={t("enterPassword")}
                  name="password"
                  maxLength="40"
                  autoComplete="off"
                  required
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <Form.Input
                  label={t("confirmPassword")}
                  type="Password"
                  placeholder={t("pleaseConfirmYourPassword")}
                  name="password"
                  maxLength="40"
                  autoComplete="off"
                  required
                  value={userConfirmPassword}
                  onChange={handleConfirmPassword}
                />
              </Form.Group>
              <Button
                color={"green"}
                onClick={handleSubmit}
                style={{fontSize: "17px", paddingLeft: "10px", paddingRight: "5px", paddingTop: "5px", paddingBottom: "5px" }}
                type="button"
                className="button"
                floated="right"
                disabled={!confirmPasswordBool}
              >
                {t("add-user")}&nbsp;&nbsp;<AddIcon />
              </Button>
              <Button
                color={"green"}
                onClick={backPage}
                style={{fontSize: "17px", paddingLeft: "5px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px" }}
                type="button"
                className="button"
                floated="left"
              >
                 <ArrowBackIcon />&nbsp;{t("back")}
              </Button>
              <br />
              <br />
            </Form>
          </Modal.Content>
          </Stack>
          </Stack>
        </Modal>
      ) : (
        <Loader active>Loading</Loader>
      )} */}
    </>
  );
};
export default NewUserForm;
