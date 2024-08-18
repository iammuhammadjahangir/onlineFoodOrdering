// import { getUsersById } from "../../Api";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../../MetaData";
import { useEffect, useState } from "react";
import swal from "sweetalert2";
import "../../Styling/AllStyle.css";
import { useSelector } from "react-redux";
// import { updateOldUser } from "../../Api";

import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Dropdown,
  Loader,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { getUsersById, updateOldUser } from "../../actions/userAction";
import "./users.css";
const EditUser = () => {
  const params = useParams();
  const navigate = useNavigate();

  //use States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [shopNo, setShopNo] = useState("");
  const [shopCode, setshopCode] = useState("");
  const [posId, setPosId] = useState("");
  const [userRole, setUserRole] = useState([]);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [userPassword, setUserPassword] = useState("");
  const [userPhoneNO, setUserPhoneNO] = useState("");
  const [userWhatsappNO, setUserWhatsappNO] = useState("");
  const [activityStatus, setActivityStatus] = useState("true");
  const [isCalled, setIsCalled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { role, loading } = useSelector((state) => state.role);
  const { t } = useTranslation();
  //Roles Array
  // const UserRolesArray = [
  //   { key: "Administrator", text: "Administrator", value: "Administrator" },
  //   { key: "Admin", text: "Admin", value: "Admin" },
  //   { key: "Salesman", text: "Salesman", value: "Salesman" },
  // ];

  //active status array
  const userActive = [
    { key: "true", text: "Active", value: true },
    { key: "false", text: "In-Active", value: false },
  ];

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled && getSpecificUser();
  }, [isCalled]);

  //to handle the role change
  const handleUserRoleSelectChange = (event, { value }) => {
    setUserRole(value);
  };

  //to handle the value to activity status
  const handleActivityStatus = (event, { value }) => {
    // console.log(value);
    setActivityStatus(value);
  };

  //Function to handle update submit
  const handleSubmit = async () => {
    if (
      !params.id ||
      !name ||
      !username ||
      !userRole ||
      !shopCode ||
      !posId ||
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
    } else {
      let result = await updateOldUser(
        params.id,
        name,
        username,
        userRole,
        activityStatus,
        shopCode,
        posId,
        userPassword,
        userPhoneNO,
        userWhatsappNO
      );
      console.log(result);
      if (result) {
        swal.fire({
          icon: "success",
          title: t("titleAdded"),
          text: t("textDataUpdatedSuccessfully"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
        navigate("/usersList");
      } else {
        swal.fire({
          icon: "error",
          title: t("titleError"),
          text: t("textDataNotUpdatedSuccessfully"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
        navigate("/usersList");
      }
    }
  };

  //Function to navigate to back page on clicking back button on mmodel
  const backPage = () => {
    navigate("/usersList");
  };

  const getSpecificUser = async () => {
    let result = await getUsersById(params.id);
    setName(result?.name);
    setUsername(result?.username);
    setShopNo(result?.shopNo?.storageCode);
    setshopCode(result?.shopNo?._id);
    setPosId(result?.posId);
    console.log(result?.roles.roleName);
    setUserRole(result?.roles.roleName);
    setUserPhoneNO(result?.phoneNo);
    setActivityStatus(result?.active.toLocaleString());
    setUserWhatsappNO(result?.whatsappNo);

    result.active ? setActivityStatus(true) : setActivityStatus(false);
    // console.log(result.active);
    // console.log("result", result);

    setIsLoading(true); // to wait for the data to load before loading the page
    setIsCalled(false);
  };

  return (
    <>
      <MetaData title="QE ~~UpdateUser" />
      <div className={`user ${colorTheme}`}>
        <div className="UserformInput">
          <div className="Userformrow">
            <div className="userform1">
              <label>{t("posId")}</label>
              <input
                type="text"
                placeholder={t("enterPOSId")}
                name="productType"
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
            <div className="userDropdownform1">
              <label>{t("role")}</label>
              <Dropdown
                className="userFormdropdown"
                options={role?.map((role) => ({
                  key: role.roleName,
                  text: role.roleName,
                  value: role._id,
                }))}
                placeholder={t("enterRole")}
                selection
                search
                required
                autoComplete="off"
                value={userRole}
                onChange={handleUserRoleSelectChange}
              />
            </div>
            <div className="userDropdownform1">
              <label>{t("status")}</label>
              <Dropdown
                className="userFormdropdown"
                options={userActive?.map((status) => ({
                  key: status.key,
                  text: status.text,
                  value: status.value,
                }))}
                placeholder={t("enterStatus")}
                selection
                search
                required
                value={activityStatus}
                onChange={handleActivityStatus}
              />
            </div>
          </div>
          <div className="UserformrowLastinput">
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
          </div>

          <div className="userButtons">
            <Button
              color={"green"}
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              {t("back")}
            </Button>
            <Button
              color={"green"}
              onClick={handleSubmit}
              type="button"
              className={`button button-add-product `}
            >
              {t("updateUser")}
            </Button>
          </div>
        </div>
      </div>
      {/* {isLoading ? (
        <Modal open dimmer="inverted" size="small" closeIcon="close">
          <Modal.Header>{t("updateUser")}</Modal.Header>
          <Modal.Content>
            <Form className={"formColorUser"}>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  label={t("role")}
                  options={UserRolesArray?.map((role) => ({
                    key: role.key,
                    text: role.text,
                    value: role.value,
                  }))}
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
                  name="phoneNo"
                  maxLength="40"
                  autoComplete="off"
                  required
                  value={userPhoneNO}
                  onChange={(e) => setUserPhoneNO(e.target.value)}
                />
                <Form.Input
                  label={t("whatsappNo")}
                  type="number"
                  placeholder={t("enterWhatsappNo")}
                  name="whatsappNo"
                  maxLength="40"
                  autoComplete="off"
                  required
                  value={userWhatsappNO}
                  onChange={(e) => setUserWhatsappNO(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  label={t("status")}
                  options={userActive?.map((status) => ({
                    key: status.key,
                    text: status.text,
                    value: status.value,
                  }))}
                  placeholder={t("enterStatus")}
                  selection
                  search
                  required
                  value={activityStatus}
                  onChange={handleActivityStatus}
                />
              </Form.Group>
              <Button
                color={"green"}
                onClick={handleSubmit}
                type="button"
                className="button"
                floated="right"
              >
                {t("updateUser")}
              </Button>
              <Button
                color={"green"}
                onClick={backPage}
                type="button"
                className="button"
                floated="left"
              >
                {t("back")}
              </Button>
              <br />
              <br />
            </Form>
          </Modal.Content>
        </Modal>
      ) : (
        <Loader active>Loading</Loader>
      )} */}
    </>
  );
};
export default EditUser;
