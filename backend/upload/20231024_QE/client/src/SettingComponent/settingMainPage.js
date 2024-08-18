import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import "./setting.css";
import { useNavigate } from "react-router-dom";
import { getPermissionForRoles } from "../Pages/user/rolesAssigned/RolesPermissionValidation";

const SettingMainPage = () => {
  const navigate = useNavigate();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [rolePermission, setRolePermission] = useState(false);

  useEffect(() => {
    setRolePermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("View Roles");
      setRolePermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  const handleClickPrinter = async () => {
    navigate("/printerSettings");
  };
  const handleClickUserProfile = async () => {
    navigate("/updateUserProfile");
  };
  const handleUserPermission = async () => {
    navigate("/RolesTable");
  };
  const handleClickTheme = async () => {
    navigate("/darkModeSetting");
  };

  const handleClickTableSetting = async () => {
    navigate("/tablePageSetting");
  };

  const handleClickLanguageSetting = async () => {
    navigate("/changeLanguageSetting");
  };

  return (
    <>
      <MetaData title="QE ~~Settings" />
      <div className={`setting ${colorTheme}`}>
        <div className="settingMaindiv">
          <div className="settingFirstDiv">
            <div
              className="setting-custom-div-first"
              onClick={handleClickPrinter}
            >
              Printer
            </div>
            <div
              className="setting-custom-div-second"
              onClick={handleClickUserProfile}
            >
              User Profile
            </div>
          </div>
          <div className="settingFirstDiv">
            <div
              className="setting-custom-div-first"
              onClick={handleClickTheme}
            >
              Theme
            </div>
            <div
              className="setting-custom-div-second"
              onClick={handleClickTableSetting}
            >
              Table Rows Setting
            </div>
          </div>
          <div className="settingFirstDiv">
            {rolePermission && (
              <div
                className="setting-custom-div-first"
                onClick={handleUserPermission}
              >
                Change Permissions
              </div>
            )}
            <div
              className="setting-custom-div-second"
              onClick={handleClickLanguageSetting}
            >
              Change Language
            </div>
          </div>
        </div>
      </div>
    </>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <div style={{ marginLeft: "30px" }}>
    //     <div className="custom-div" onClick={handleClickPrinter}>
    //       Printer
    //     </div>
    //     <div className="custom-div" onClick={handleClickUserProfile}>
    //       User Profile
    //     </div>
    //     <div className="custom-div" onClick={handleClickTheme}>
    //       Theme
    //     </div>
    //     <div className="custom-div" onClick={handleClickTableSetting}>
    //       Table Rows Setting
    //     </div>
    //     <div className="custom-div" onClick={handleUserPermission}>
    //       Change Permissions
    //     </div>
    //   </div>
    // </div>
  );
};

export default SettingMainPage;
