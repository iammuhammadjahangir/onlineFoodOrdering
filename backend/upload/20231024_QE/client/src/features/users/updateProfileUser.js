import React, { useEffect, useState } from "react";
import MetaData from "../../MetaData";
import // getOneUserByUserName,
// getVerifiedUserMessage,
// updateUserPassword,
"../../Api";
import { useNavigate } from "react-router-dom";
import userchecked from "./icon48.png";
import { useTranslation } from "react-i18next";
import swal from "sweetalert2";
import { FaCheck } from "react-icons/fa";

import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Dropdown,
  Loader,
} from "semantic-ui-react";

import "../../../src/Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getOneUserByUserName,
  getVerifiedUserMessage,
  updateUserPassword,
} from "../../actions/userAction";
import "./users.css";
const UpdateProfileUser = () => {
  //useState for update user Profile
  const [error, seterror] = useState("");
  const [isCalled, setIsCalled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [confirmPasswordBool, setConfirmPasswordBool] = useState(false);

  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userOldPassword, setUserOldPassword] = useState("");
  const [colorTheme, setColorTheme] = useState("theme-white");
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    setUserPassword("");
    setUserOldPassword("");
    setConfirmPasswordBool(false);
    isCalled && getUserByUserName();
    // console.log(JSON.parse(localStorage.getItem("username")));
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  const getUserByUserName = async () => {
    let result = await getOneUserByUserName(
      JSON.parse(localStorage.getItem("username"))
    );
    setIsCalled(false);
    setIsLoading(true); // to wait for the data to load before loading the page
    setUsername(result.username);

    // console.log(result);
  };

  //check that user has written old password right or not
  const handleverifiedOldPassword = async () => {
    // console.log(username);
    // console.log(userOldPassword);
    if (!username || !userOldPassword) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textEnterOldPassword"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      seterror("");
      console.log(username);
      let result = await getVerifiedUserMessage(username, userOldPassword);
      result.message === "Unauthorized"
        ? seterror("Invalid Password")
        : setIsVerified(true);
    }
  };

  const handleConfirmPassword = (event, { value }) => {
    console.log("chie");
    // setUserConfirmPassword(value);
    // if (userPassword === value) {
    //   setConfirmPasswordBool(true);
    // } else {
    //   setConfirmPasswordBool(false);
    // }
  };

  //to sbmit the new password
  const handleSubmit = async () => {
    // console.log(username);
    // console.log(userPassword);
    if (!userPassword) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textNewPassword"),
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
      let result = await updateUserPassword(username, userPassword);
      if (result.message === "Password updated") {
        swal
          .fire({
            icon: "success",
            title: t("titleAdded"),
            text: `${username} ${t("textPasswordUpdatedSuccessfully")}`,
            showConfirmButton: true,
            customClass: {
              popup: "custom-swal-popup", // This is the custom class you're adding
            },
          })
          .then(() => {
            navigate("/");
          });
      } else {
        return swal.fire({
          icon: "error",
          title: t("titleError"),
          text: t("textErrorUpdatingPassword"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      }
    }
  };

  return (
    <>
      <MetaData title="QE ~~UpdateProfile" />
      <div className={`user ${colorTheme}`}>
        {isLoading ? (
          <div className="formInput">
            <div className="row">
              {error && (
                <label
                  htmlFor="error"
                  style={{
                    color: "red",
                    fontSize: "1.5rem",
                  }}
                >
                  {error}
                </label>
              )}
              <div className="form1">
                <label>{t("currentPassword")}</label>
                <div className="currentPass">
                  <input
                    type="text"
                    placeholder={t("enterCurrentPassword")}
                    name="productType"
                    autoComplete="off"
                    maxLength="40"
                    disabled={isVerified}
                    value={userOldPassword}
                    onChange={(e) => setUserOldPassword(e.target.value)}
                  />
                  <button
                    className="profileButton"
                    onClick={handleverifiedOldPassword}
                  >
                    {!isVerified ? (
                      t("verify")
                    ) : (
                      <img src={userchecked} disabled />
                    )}
                  </button>
                </div>
              </div>
              {isVerified && (
                <>
                  <div className="rowupdate">
                    <div className="form1">
                      <label>{t("newPassword")}</label>
                      <input
                        type="text"
                        placeholder={t("enterNewPassword")}
                        name="productCode"
                        autoComplete="off"
                        maxLength="40"
                        required
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                      />
                    </div>
                    <div className="form1">
                      <label>{t("Confirm Password")}</label>
                      <input
                        type="text"
                        placeholder={t("Please Confirm your Password")}
                        name="productCode"
                        autoComplete="off"
                        maxLength="40"
                        required
                        value={userConfirmPassword}
                        onChange={(e) => {
                          setUserConfirmPassword(e.target.value);
                          if (userPassword === e.target.value) {
                            setConfirmPasswordBool(true);
                          } else {
                            setConfirmPasswordBool(false);
                          }
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="userProfileButtons">
              <Button
                color={"green"}
                onClick={() => {
                  navigate("/settings");
                }}
                type="button"
                className="button button-back"
                floated="left"
              >
                <ArrowBackIcon />
                &nbsp;{t("back")}
              </Button>
              <Button
                onClick={handleSubmit}
                type="button"
                disabled={!confirmPasswordBool}
                className={`button button-add-product `}
                floated="right"
              >
                {t("updatePassword")}&nbsp;&nbsp;
                <UpdateIcon />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Loader active>Loading</Loader>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateProfileUser;
